import React, { useState, useEffect, useRef } from 'react';
import queryString from 'querystring';
import SearchBox from '../SearchBox';
import List from '../List';
import styles from './Home.css';
import Pager from '../Pager';
import { categoryNameMap } from 'src/util/category';

/**
 * @typedef {import('@types').SearchOptions} SearchOptions
 * @typedef {import('@types').ImageSearchResponse} ImageSearchResponse
 */

const Home = ({ history }) => {
	const [list, setList] = useState([]);
	const [loading, setLoading] = useState(false);
	const [total, setTotal] = useState(0);
	const [startTime, setStartTime] = useState(0);
	const [endTime, setEndTime] = useState(0);
	const [isPagerVisible, setPagerVisible] = useState(false);
	const aborter = useRef();
	const totalStatus = useRef();

	const query = queryString.parse(history.location.search.substr(1));
	if (typeof query.personally === "string") {
		query.personally = query.personally?.split(',').reduce((o,v) => {
			o[v] = true;
			return o;
		}, {});
	}
	const { page = 1, limit = 10 } = query;
	const totalPage = Math.ceil(total / +limit);

	const getList = () => {
		/** @type {HTMLElement | null} */
		const imgPreview = document.querySelector('#imagePreview');
		imgPreview ? imgPreview.style.display = 'none' : null;

		setPagerVisible(true);
		setLoading(true);
		setStartTime(Date.now());
		if (aborter.current) {
			aborter.current.abort();
		}

		const abort = new AbortController();
		aborter.current = abort;
		const { signal } = abort;

		fetch(`/api/search${history.location.search}`, { signal }).then(res => res.json()).then((res) => {
			const { data, total, code, message } = res;
			aborter.current = null;
			setEndTime(Date.now());

			if (code !== 200) {
				alert('Request error: ' + (message || 'unknown'));
				return;
			}

			setList(data);
			setTotal(total);
			setLoading(false);
			if (totalStatus.current) {
				totalStatus.current.scrollIntoView({
					behavior: 'smooth',
					block: 'nearest',
				});
			}
		}).catch((err) => {
			if (err.name === 'AbortError') {
				return;
			}

			aborter.current = null;
			setLoading(false);
			alert('Request error: ' + ((err || {}).message || 'unknown'));
		});
	};

	/**
	 * 
	 * @param {SearchOptions} options 
	 */
	const onSearch = (options) => {
		const sortedOptions = Object.keys(options).sort().reduce((pre, cur) => {
			if (options[cur] !== "") {
				if (cur === "personally") {
					const vals = Object.keys(options[cur]).filter(k => options[cur][k]);
					if (vals.length > 0) {
						pre[cur] = vals.join(',');
					}
				} else {
					pre[cur] = options[cur];
				}
			}
			return pre;
		}, {});
		history.push(`/?${queryString.stringify(sortedOptions)}`);
	};

	/**
	 * 
	 * @param {import('@types').Personal} args 
	 */
	const onPersonal = (args) => {
		fetch('/api/personal', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(args),
		})
		.then(response => {
			console.log(response)
		});
	};

	/**
	 * 
	 * @param {FormData} formData 
	 * @param {SearchOptions | undefined} options 
	 */
	const onFileSearch = (formData, options) => {
		setPagerVisible(false);
		setLoading(true);
		setStartTime(Date.now());
		fetch('/api/searchImage', {
			method: 'POST',
			body: formData,
		})
		.then(response => {
			setLoading(false);
			setEndTime(Date.now());
			if (response.ok) {
				return response.json();
			}
			throw new Error('File upload failed');
		})
		.then((/** @type {ImageSearchResponse} */ res) => {
			const { data } = res;
			const filtered = !options ? data : data.filter(d => {
				const posted = new Date(d.posted * 1000);
				const category = categoryNameMap[d.category].value;
				return (options.category & category) &&
					(!options.minrating || d.rating >= options.minrating) &&
					(!d.replaced || options.replaced) &&
					(!d.expunged || options.expunged) &&
					(!d.removed || options.removed) &&
					(!options.mindate || posted >= new Date(+options.mindate * 1000)) &&
					(!options.maxdate || posted <= new Date(+options.maxdate * 1000));
			});
			setList(filtered);
			setTotal(filtered.length);
		})
		.catch(error => {
			console.error('Error:', error);
		});
	};

	const setPage = (page) => {
		onSearch({ ...query, page });
	};

	/**
	 * 
	 * @param {SearchOptions} options 
	 * @param {{ append?: any }} param1 
	 */
	const onGallerySearch = (options, { append } = {}) => {
		const data = { ...query };
		delete data.page;
		Object.keys(options).forEach((cur) => {
			if (append) {
				if (cur === 'keyword' && options[cur].startsWith('uploader:') && data[cur]) {
					data[cur] = data[cur].replace(/\s*uploader:(?:"[\s\S]+?\$"|.+?\$)/, '');
				}
				data[cur] = [data[cur], options[cur]].filter(e => e).join(' ');
			}
			else {
				data[cur] = options[cur];
			}
		}, {});
		onSearch(data);
	};

	useEffect(getList, [history.location]);

	return (
		<div className={styles.container}>
			<SearchBox options={query} onSearch={onSearch} onFileSearch={onFileSearch} />
			<p className={styles.total} ref={totalStatus}>
				{loading ? 'Loading...' : `Matches ${total?.toLocaleString()} ${total > 1 ? 'results' : 'result'}`}
				{!loading && <span> ({(endTime - startTime) / 1000} sec)</span>}
			</p>
			{list.length ? (
				<>
					{isPagerVisible && <Pager page={+page} total={totalPage} onChange={setPage} />}
					<List list={list} loading={loading} onSearch={onGallerySearch} onPersonal={onPersonal} />
					{isPagerVisible && <Pager page={+page} total={totalPage} onChange={setPage} />}
				</>
			) : null}
		</div>
	);
};

export default Home;