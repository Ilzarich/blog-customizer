import { CSSProperties, useState } from 'react';
import { defaultArticleState } from 'src/constants/articleProps';
import { ArticleParamsForm } from '../article-params-form';
import { Article } from '../article';

import styles from './app.module.scss';

export const App = () => {
	const [datePage, setDatePage] = useState(defaultArticleState);

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': datePage.fontFamilyOption.value,
					'--font-size': datePage.fontSizeOption.value,
					'--font-color': datePage.fontColor.value,
					'--container-width': datePage.contentWidth.value,
					'--bg-color': datePage.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm date={datePage} setDate={setDatePage} />
			<Article />
		</main>
	);
};
