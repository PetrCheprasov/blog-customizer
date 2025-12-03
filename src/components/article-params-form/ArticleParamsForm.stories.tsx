import type { Meta, StoryObj } from '@storybook/react';
import { ArticleParamsForm } from './ArticleParamsForm';
import { useState } from 'react';
import { defaultArticleState } from 'src/constants/articleProps';

const ArticleParamsFormWrapper = () => {
	const [settings, setSettings] = useState({
		fontFamilyOption: defaultArticleState.fontFamilyOption,
		fontColor: defaultArticleState.fontColor,
		backgroundColor: defaultArticleState.backgroundColor,
		contentWidth: defaultArticleState.contentWidth,
		fontSize: defaultArticleState.fontSizeOption.value,
	});

	return <ArticleParamsForm currentSettings={settings} onApply={setSettings} />;
};

const meta: Meta<typeof ArticleParamsFormWrapper> = {
	title: 'Components/ArticleParamsForm',
	component: ArticleParamsFormWrapper,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		viewport: {
			defaultViewport: 'responsive',
		},
	},
};

export default meta;
type Story = StoryObj<typeof ArticleParamsFormWrapper>;

export const Default: Story = {
	decorators: [
		(Story) => (
			<div
				style={{
					height: '100vh',
					overflow: 'visible',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'flex-start',
					padding: '20px',
					backgroundColor: '#f5f5f5',
				}}>
				<Story />
			</div>
		),
	],
};
