import { useState } from 'react';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	type ArticleStateType,
} from './constants/articleProps';

import styles from './styles/index.module.scss';

type ArticleSettings = Omit<ArticleStateType, 'fontSizeOption'> & {
	fontSize: string;
};

export const App = () => {
	const [pageStyle, setPageStyle] = useState<ArticleSettings>({
		fontFamilyOption: defaultArticleState.fontFamilyOption,
		fontColor: defaultArticleState.fontColor,
		backgroundColor: defaultArticleState.backgroundColor,
		contentWidth: defaultArticleState.contentWidth,
		fontSize: defaultArticleState.fontSizeOption.value,
	});

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': pageStyle.fontFamilyOption.value,
					'--font-size': pageStyle.fontSize,
					'--font-color': pageStyle.fontColor.value,
					'--container-width': pageStyle.contentWidth.value,
					'--bg-color': pageStyle.backgroundColor.value,
				} as React.CSSProperties
			}>
			<ArticleParamsForm currentSettings={pageStyle} onApply={setPageStyle} />
			<Article />
		</main>
	);
};
