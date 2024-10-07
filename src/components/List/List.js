import React from 'react';
import Gallery from '../Gallery';
import styles from './List.css';

const List = ({ list = [], loading = false, onSearch, onPersonal }) => (
	<div className={[styles.container, loading ? styles.loading : ''].join(' ').trim()}>
		{list.map(e => (
			<div className={styles.item} key={e.gid}>
				<Gallery {...e} onSearch={onSearch} onPersonal={onPersonal}/>
			</div>
		))}
	</div>
);

export default List;