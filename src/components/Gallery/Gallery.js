import React, { useState } from 'react';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import fileSize from '../../util/fileSize';
import styles from './Gallery.css';
import { categoryNameMap } from '../../util/category';
import Rating from '../Rating';
import parseEntity from '../../util/parseEntity';
import Modal from '../Modal/Modal';
import Torrent from '../Torrent';
import featureFlags from 'src/util/featureFlags';

/**
 * @param {import('@types').GalleryOptions} args
 */
const Gallery = ({
	thumb, category, uploader, posted, expunged, removed, replaced, filesize, filecount,
	title, title_jpn, rating, tags = [], gid, token, torrents, personal,
	onSearch = () => {}, onPersonal = () => {}
}) => {
	const [visible, setVisible] = useState(false);
	const [isEditNote, setEditNote] = useState(false);
	const [personalVal, setPersonalVal] = useState(personal);
	const [note, setNote] = useState(personal?.note || '');
	const toggleTorrentModal = () => setVisible(!visible);

	const onChangePersonal = (newPersonal) => {
		setPersonalVal({...personalVal, ...newPersonal});
		onPersonal({...personalVal, ...newPersonal, gid});
	};

	const onNoteSave = () => {
		onChangePersonal({note});
		setEditNote(false);
	};

	const tagList = {};
	tags.forEach(e => {
		const [type, name] = ['misc'].concat(e.split(':', 2)).slice(-2);
		if (!tagList[type]) {
			tagList[type] = [];
		}
		tagList[type].push(name);
	});

	const resolvedThumb = (thumb.includes('/') || thumb.length < 5
		? thumb
		: `pandathumbs/${thumb.slice(0,2)}/${thumb.slice(2,4)}/${thumb}`
	).replace(/_l\./, '_250.')

	const renderPersonal = () => {
		if (!featureFlags.isEnabled('personal') || !personal) {
			return null;
		}
		return <div className={styles.personal}>
			<div className={styles.metaSingleItem}>
				<label className={styles.checkbox}>
					<input type="checkbox" checked={!!personalVal?.have} onChange={(e) => onChangePersonal({have: e.target.checked})}/>
					<span>Have</span>
				</label>
				<label className={styles.checkbox}>
					<input type="checkbox" checked={!!personalVal?.done} onChange={(e) => onChangePersonal({done: e.target.checked})}/>
					<span>Read</span>
				</label>
				<label className={styles.checkbox}>
					<input type="checkbox" checked={!!personalVal?.want} onChange={(e) => onChangePersonal({want: e.target.checked})}/>
					<span>Want</span>
				</label>
			</div>
			<div className={styles.metaSingleItem}>
				{personalVal?.have && <a href={`panda://${gid}`}>Open cbz</a>}
			</div>
		</div>;
	};

	return (
		<div className={styles.container}>
			<div className={styles.coverWrap}>
				<img src={resolvedThumb} className={styles.cover} />
			</div>
			<div className={styles.meta}>
				<div className={styles.metaSingleItem}>
					<div
						className={styles.category}
						style={{ background: categoryNameMap[category].color }}
						onClick={() => onSearch({ category: categoryNameMap[category].value })}>
						{category}
					</div>
				</div>
				<div className={styles.metaSingleItem}>
					<a
						onClick={(event) => onSearch({
							keyword: `uploader:${/\s/.test(uploader) ? `"${uploader}$"` : `${uploader}$`}`
						}, {
							append: event.ctrlKey,
						})}>
						{uploader}
					</a>
				</div>
				<div className={styles.metaItem}>
					<span className={styles.metaLabel}>Gallery ID:</span>
					<span className={styles.metaValue}>
						<a
							title="Search galleries belongs to the ID"
							onClick={(event) => {
								if (event.ctrlKey) {
									event.preventDefault();
									event.stopPropagation();
									window.open(
										`https://e${event.altKey ? 'x' : '-'}hentai.org/g/${gid}/${token}/`,
										'_blank',
										'noreferrer'
									);
								} else {
									onSearch({
										keyword: `gid:${gid}$`
									}, {
										append: event.ctrlKey,
									});
								}
							}}>
							{gid}
						</a>
					</span>
				</div>
				<div className={styles.metaItem}>
					<span className={styles.metaLabel}>Token:</span>
					<span className={styles.metaValue}>
						{token}
					</span>
				</div>
				<div className={styles.metaItem}>
					<span className={styles.metaLabel}>Posted:</span>
					<span className={styles.metaValue}>
						{moment(posted * 1000).format('YYYY-MM-DD HH:mm:ss')}
					</span>
				</div>
				<div className={styles.metaItem}>
					<span className={styles.metaLabel}>Visible:</span>
					<span className={styles.metaValue}>
						{
							expunged ? 'No (Expunged)'
								: removed ? 'No (Removed)'
									: replaced ? 'No (Replaced)'
										: category.toLowerCase() === 'private' ? 'No (Private)'
											: 'Yes'
						}
					</span>
				</div>
				<div className={styles.metaItem}>
					<span className={styles.metaLabel}>File Size:</span>
					<span className={styles.metaValue}>
						{fileSize(filesize)}
					</span>
				</div>
				<div className={styles.metaItem}>
					<span className={styles.metaLabel}>File Length:</span>
					<span className={styles.metaValue}>
						{filecount}
						{' '}
						{filecount > 1 ? 'pages' : 'page'}
					</span>
				</div>
				<div className={styles.metaItem}>
					<span className={styles.metaLabel}>Torrents:</span>
					<span className={styles.metaValue}>
						<a
							className={styles.torrentLink}
							onClick={torrents.length ? toggleTorrentModal : null}
							disabled={!torrents.length}>
							{torrents.length}
						</a>
					</span>
				</div>
				<div className={styles.metaItem}>
					<span className={styles.metaLabel}>Rating:</span>
					<span className={styles.metaValue}>
						<Rating value={rating} />
						{rating}
					</span>
				</div>
				{featureFlags.isEnabled('personal') &&
					<div className={styles.metaItem}>
						<span className={styles.metaLabel}>My Rating:</span>
						<span className={styles.metaValue}>
							<Rating value={personalVal?.rating} onClick={i => onChangePersonal({rating: i})} />
							{personalVal?.rating}
						</span>
					</div>
				}
				{personal && renderPersonal()}
			</div>
			<div className={styles.main}>
				<div className={styles.header}>
					<h2 className={styles.title}>
						{parseEntity(title)}
					</h2>
					<h3 className={styles.subtitle}>
						{parseEntity(title_jpn)}
					</h3>
				</div>
				<div className={styles.content}>
					<div className={styles.tags}>
						{Object.entries(tagList).map(([type, list]) => (
							<div className={styles.tagLine} key={type}>
								<div className={styles.tagType}>{type}:</div>
								<div className={styles.tagList}>
									{list.map(tag => (
										<a
											key={tag}
											onClick={(event) => onSearch({
												keyword: `${type === 'misc' ? '' : `${type}:`}${/\s/.test(tag) ? `"${tag}$"` : `${tag}$`}`
											}, {
												append: event.ctrlKey,
											})}>
											{tag}
										</a>
									))}
								</div>
							</div>
						))}
					</div>
					{featureFlags.isEnabled('personal') &&
						<div className={styles.note}>
							<a onClick={() => setEditNote(!isEditNote)}>{isEditNote ? 'Cancel' : 'Edit note'}</a>
							{isEditNote
								? <>
									<textarea rows={5} cols={22}
										onChange={(evt) => setNote(evt.target.value)}
										value={note} />
									<a onClick={onNoteSave}>save</a>
								</>
								: note && <div>{note}</div>
							}
						</div>
					}
				</div>
			</div>
			<Modal visible={visible} onClose={toggleTorrentModal}>
				<Torrent torrents={torrents} gid={gid} />
			</Modal>
		</div>
	);
};

export default withRouter(Gallery);