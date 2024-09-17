import React, { useState, useEffect } from 'react';
import categoryList from '../../util/category';
import styles from './SearchBox.css';
import moment from 'moment';

const SearchBox = ({ options: passedOptions = {}, onSearch }) => {
	const defaultOptions = {
		category: 1023,
		keyword: '',
		expunged: 0,
		replaced: 0,
		removed: 0,
		minpage: '',
		maxpage: '',
		minrating: '',
		limit: 10,
		mindate: '',
		maxdate: '',
		advance: 0,
	};
	const storedOptions = JSON.parse(localStorage.getItem('searchOptions')) || {};
	const options = {
		...defaultOptions,
		...storedOptions,
		...passedOptions
	};
	const [category, setCategory] = useState(+options.category);
	const [keyword, setKeyword] = useState(options.keyword);
	const [expunged, setExpunged] = useState(+options.expunged);
	const [replaced, setReplaced] = useState(+options.replaced);
	const [removed, setRemoved] = useState(+options.removed);
	const [minpage, setMinPage] = useState(options.minpage);
	const [maxpage, setMaxPage] = useState(options.maxpage);
	const [minrating, setMinRating] = useState(options.minrating);
	const [limit, setLimit] = useState(options.limit);
	const [mindate, setMinDate] = useState(options.mindate);
	const [maxdate, setMaxDate] = useState(options.maxdate);
	const [showAdvance, setShowAdvance] = useState(+options.advance);

	const updateCategory = (event) => {
		const value = +event.target.value;
		setCategory(category + (event.target.checked ? value : -value));
	};

	const updateKeyword = (event) => {
		setKeyword(event.target.value);
	};

	const updateExpunged = (event) => {
		setExpunged(+event.target.checked);
	};

	const updateReplaced = (event) => {
		setReplaced(+event.target.checked);
	};

	const updateRemoved = (event) => {
		setRemoved(+event.target.checked);
	};

	const updateMinRating = (event) => {
		setMinRating(+event.target.value);
	};

	const updateMinPage = (event) => {
		setMinPage(+event.target.value);
	};

	const updateMaxPage = (event) => {
		setMaxPage(+event.target.value);
	};

	const updateLimit = (event) => {
		setLimit(+event.target.value);
	};

	const updateMinDate = (event) => {
		setMinDate(Math.floor(moment(event.target.value).valueOf() / 1000));
	};

	const updateMaxDate = (event) => {
		setMaxDate(Math.floor(moment(event.target.value).valueOf() / 1000));
	};

	const toggleAdvance = () => {
		setShowAdvance(!showAdvance);
	};

	const saveDefaultOptions = () => {
		localStorage.setItem('searchOptions', JSON.stringify({
			category,
			keyword,
			expunged,
			replaced,
			removed,
			minpage,
			maxpage,
			minrating,
			limit,
			mindate,
			maxdate,
			advance: +showAdvance,
		}));
	};

	const onSubmit = (event) => {
		event.preventDefault();
		if (onSearch) {
			onSearch({
				category,
				keyword,
				expunged,
				replaced,
				removed,
				minpage,
				maxpage,
				minrating,
				limit,
				mindate,
				maxdate,
				advance: +showAdvance,
			});
		}
	};

	return (
		<form className={styles.container} onSubmit={onSubmit}>
			<div className={styles.category}>
				{categoryList.filter(e => e.visible !== false).map(e => (
					<label key={e.value} className={styles.item}>
						<input type="checkbox" checked={category & e.value} value={e.value} onChange={updateCategory} className={styles.checkbox} />
						<span className={styles.name} style={{ background: e.color }}>{e.name}</span>
					</label>
				))}
			</div>
			<div className={styles.search}>
				<input value={keyword} onChange={updateKeyword} className={styles.input} />
				<button className={styles.button}>Search</button>
			</div>
			<div className={styles.toggle}>
				<a onClick={toggleAdvance}>
					{showAdvance ? 'Hide Advanced Options' : 'Show Advanced Options'}
				</a>
				<span> | </span>
				<a onClick={saveDefaultOptions}>
					Save options as default
				</a>
			</div>
			{showAdvance ? (
				<div className={styles.advance}>
					<label className={styles.advanceItem}>
						<input type="checkbox" checked={expunged} onChange={updateExpunged} />
						Show Expunged
					</label>
					<label className={styles.advanceItem}>
						<input type="checkbox" checked={removed} onChange={updateRemoved} />
						Show Removed
					</label>
					<label className={styles.advanceItem}>
						<input type="checkbox" checked={replaced} onChange={updateReplaced} />
						Show Replaced
					</label>
					<label className={styles.advanceItem}>
						Show
						<select value={limit} onChange={updateLimit} className={styles.select}>
							{(new Array(5).fill('')).map((e, i) => (
								<option value={(i + 1) * 5} key={i}>{(i + 1) * 5}</option>
							))}
						</select>
						galleries per page
					</label>
					<label className={styles.advanceItem}>
						Minimum Rating
						<select value={minrating} onChange={updateMinRating} className={styles.select}>
							{(new Array(5).fill('')).map((e, i) => (
								<option value={i + 1} key={i}>{i + 1}</option>
							))}
						</select>
					</label>
					<label className={styles.advanceItem}>
						Between
						<input type="number" className={styles.inputNumber} value={minpage} onChange={updateMinPage} />
						and
						<input type="number" className={styles.inputNumber} value={maxpage} onChange={updateMaxPage} />
						pages
					</label>
					<label className={styles.advanceItem}>
						Post after
						<input type="datetime-local" className={styles.date} value={mindate ? moment(mindate * 1000).format('YYYY-MM-DDTHH:mm') : ''} onChange={updateMinDate} />
					</label>
					<label className={styles.advanceItem}>
						Post before
						<input type="datetime-local" className={styles.date} value={maxdate ? moment(maxdate * 1000).format('YYYY-MM-DDTHH:mm') : ''} onChange={updateMaxDate} />
					</label>
				</div>
			) : null}
		</form>
	);
};

export default SearchBox;