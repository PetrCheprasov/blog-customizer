import { useRef } from 'react';
import type { MouseEventHandler } from 'react';
import clsx from 'clsx';
import { OptionType } from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import { isFontFamilyClass } from './helpers/isFontFamilyClass';
import { useEnterOptionSubmit } from './hooks/useEnterOptionSubmit';

import styles from './Select.module.scss';

type OptionProps = {
	option: OptionType;
	onClick: (value: OptionType['value']) => void;
	disabled?: boolean;
	isSelected?: boolean;
};

export const Option = (props: OptionProps) => {
	const {
		option: { value, title, optionClassName, className },
		onClick,
		disabled = false,
		isSelected = false,
	} = props;
	const optionRef = useRef<HTMLLIElement>(null);

	const handleClick =
		(clickedValue: OptionType['value']): MouseEventHandler<HTMLLIElement> =>
		() => {
			if (!disabled) {
				onClick(clickedValue);
			}
		};

	useEnterOptionSubmit({
		optionRef,
		value,
		onClick: disabled ? () => {} : onClick,
	});

	return (
		<li
			className={clsx(
				styles.option, 
				styles[optionClassName || ''],
				{
					[styles.option_disabled]: disabled,
					[styles.option_selected]: isSelected
				}
			)}
			value={value}
			onClick={handleClick(value)}
			tabIndex={disabled ? -1 : 0}
			aria-disabled={disabled}
			data-disabled={disabled}
			data-selected={isSelected}
			data-testid={`select-option-${value}`}
			ref={optionRef}>
			<Text family={isFontFamilyClass(className) ? className : undefined}>
				{title}
			</Text>
			{}
			{isSelected && optionClassName?.includes('option-') && (
				<div className={styles.selectedDot} />
			)}
		</li>
	);
};