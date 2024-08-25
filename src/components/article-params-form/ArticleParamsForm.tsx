import { ArrowButton } from 'components/arrow-button';
import { Text } from '../text';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { Button } from '../button';
import { useState, useEffect, useRef, FormEvent } from 'react';
import clsx from 'clsx';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	OptionType,
	defaultArticleState,
	ArticleStateType,
} from '../../constants/articleProps';
import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	date: ArticleStateType;
	setDate: (data: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	date,
	setDate,
}: ArticleParamsFormProps) => {
	//Состояние форм и данных
	const [form, setForm] = useState(false);
	const [state, setState] = useState(date);

	const formRef = useRef<HTMLFormElement>(null);

	//Открытие и закрытие формы

	function openForm() {
		setForm(!form);
	}

	function closeForm() {
		setForm(false);
	}

	useEffect(() => {
		function closeFormEsc(event: KeyboardEvent) {
			if (event.code === 'Escape') setForm(false);
		}

		document.addEventListener('keydown', closeFormEsc);
		return () => document.removeEventListener('keydown', closeFormEsc);
	}, []);

	function closeFormOverlay(event: React.MouseEvent<HTMLDivElement>) {
		if (event.target === event.currentTarget) {
			closeForm();
		}
	}

	function handlerFontFamaly(item: OptionType) {
		setState({ ...state, fontFamilyOption: item });
	}

	function handlerFontSize(item: OptionType) {
		setState({ ...state, fontSizeOption: item });
	}

	function handlerFontColor(item: OptionType) {
		setState({ ...state, fontColor: item });
	}

	function handlerBackgroundColor(item: OptionType) {
		setState({ ...state, backgroundColor: item });
	}

	function handlerContentWidth(item: OptionType) {
		setState({ ...state, contentWidth: item });
	}

	function handleReset() {
		setState(defaultArticleState);
		setDate(defaultArticleState);
	}

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setDate(state);
	}

	return (
		<>
			<ArrowButton state={form} openForm={openForm} />

			{form && (
				<div className={styles.overlay} onClick={closeFormOverlay}>
					<aside
						className={clsx(styles.container, {
							[styles.container_open]: form,
						})}
						ref={formRef}>
						<form
							className={styles.form}
							onSubmit={handleSubmit}
							onReset={handleReset}>
							<Text as='h2' size={31} weight={800} uppercase={true}>
								Задайте параметры
							</Text>
							<Select
								title='Шрифт'
								options={fontFamilyOptions}
								selected={state.fontFamilyOption}
								onChange={handlerFontFamaly}
							/>
							<RadioGroup
								name='font size'
								title='размер шрифта'
								options={fontSizeOptions}
								selected={state.fontSizeOption}
								onChange={handlerFontSize}
							/>

							<Select
								title='Цвет шрифта'
								options={fontColors}
								selected={state.fontColor}
								onChange={handlerFontColor}
							/>

							<Separator />

							<Select
								title='Цвет фона'
								options={backgroundColors}
								selected={state.backgroundColor}
								onChange={handlerBackgroundColor}
							/>
							<Select
								title='Ширина контента'
								options={contentWidthArr}
								selected={state.contentWidth}
								onChange={handlerContentWidth}
							/>

							<div className={styles.bottomContainer}>
								<Button title='Сбросить' type='reset' />
								<Button title='Применить' type='submit' />
							</div>
						</form>
					</aside>
				</div>
			)}
		</>
	);
};
