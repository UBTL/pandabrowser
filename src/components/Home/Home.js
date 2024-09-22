import React, { useState, useEffect, useRef } from 'react';
import queryString from 'querystring';
import SearchBox from '../SearchBox';
import List from '../List';
import styles from './Home.css';
import Pager from '../Pager';

const Home = ({ history }) => {
	const [list, setList] = useState([]);
	const [loading, setLoading] = useState(false);
	const [total, setTotal] = useState(null);
	const [startTime, setStartTime] = useState(null);
	const [endTime, setEndTime] = useState(null);
	const [isPagerVisible, setPagerVisible] = useState(false);
	const aborter = useRef();
	const totalStatus = useRef();

	const query = queryString.parse(history.location.search.substr(1));
	const { page = 1, limit = 10 } = query;
	const totalPage = Math.ceil(total / limit);

	const getList = () => {
		document.querySelector('#imagePreview').style.display = 'none';
		setPagerVisible(false);
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

	const onSearch = (options) => {
		const sortedOptions = Object.keys(options).sort().reduce((pre, cur) => {
			if (options[cur]) {
				pre[cur] = options[cur];
			}
			return pre;
		}, {});
		history.push(`/?${queryString.stringify(sortedOptions)}`);
	};

	const onFileSearch = (formData) => {
		setPagerVisible(true);
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
		.then(res => {
			const { data, total, code, message } = res;
			console.log('Success:', res);
			setList(data);
			setTotal(data.length);
		})
		.catch(error => {
			console.error('Error:', error);
		});
	};

	const setPage = (page) => {
		onSearch({ ...query, page });
	};

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
			<SearchBox options={query} search={history.location.search} onSearch={onSearch} onFileSearch={onFileSearch} />
			<p className={styles.total} ref={totalStatus}>
				{loading ? 'Loading...' : `Matches ${total?.toLocaleString()} ${total > 1 ? 'results' : 'result'}`}
				{!loading && <span> ({(endTime - startTime) / 1000} sec)</span>}
			</p>
			{list.length ? (
				<>
					{!isPagerVisible && <Pager page={+page} total={totalPage} onChange={setPage} />}
					<List list={list} loading={loading} onSearch={onGallerySearch} />
					{!isPagerVisible && <Pager page={+page} total={totalPage} onChange={setPage} />}
				</>
			) : null}
		</div>
	);
};

export default Home;