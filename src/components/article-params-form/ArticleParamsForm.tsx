import { useState } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import {
  fontFamilyOptions,
  fontColors,
  backgroundColors,
  contentWidthArr,
  fontSizeOptions,
  defaultArticleState,
  type OptionType,
  type ArticleStateType
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleSettings = Omit<ArticleStateType, 'fontSizeOption'> & {
  fontSize: string;
};

type ArticleParamsFormProps = {
  currentSettings: ArticleSettings;
  onApply: (settings: ArticleSettings) => void;
};

const prepareColorOptions = (
  allColors: OptionType[], 
  currentColor: OptionType, 
  conflictingColor: OptionType
): OptionType[] => {
  return allColors.map(color => ({
    ...color,
    disabled: color.value === conflictingColor.value
  }));
};

export const ArticleParamsForm = ({ 
  currentSettings, 
  onApply 
}: ArticleParamsFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const [formSettings, setFormSettings] = useState<ArticleSettings>(currentSettings);

  const fontColorOptions = prepareColorOptions(
    fontColors,
    formSettings.fontColor,
    formSettings.backgroundColor
  );
  
  const backgroundColorOptions = prepareColorOptions(
    backgroundColors,
    formSettings.backgroundColor,
    formSettings.fontColor
  );

  const handleChange = (key: keyof ArticleSettings, option: OptionType) => {
    if (option.disabled) return;
    setFormSettings(prev => ({ ...prev, [key]: option }));
  };

  const handleFontSizeChange = (value: string) => {
    setFormSettings(prev => ({ 
      ...prev, 
      fontSize: value
    }));
  };

  const handleReset = () => {
    setFormSettings({
      fontFamilyOption: defaultArticleState.fontFamilyOption,
      fontColor: defaultArticleState.fontColor,
      backgroundColor: defaultArticleState.backgroundColor,
      contentWidth: defaultArticleState.contentWidth,
      fontSize: defaultArticleState.fontSizeOption.value,
    });
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Применить настройки:', formSettings);
    onApply(formSettings);
  };

  return (
    <>
      <ArrowButton 
        isOpen={isOpen} 
        onClick={() => setIsOpen(!isOpen)} 
      />
      <aside className={`${styles.container} ${isOpen ? styles.container_open : ''}`}>
        <form className={styles.form} onSubmit={handleApply} onReset={handleReset}>     
          <h2 className={styles.formTitle}>
            ЗАДАЙТЕ ПАРАМЕТРЫ
          </h2>
          
          <div className={styles.section} style={{ marginBottom: '50px' }}>
            <Text size={16} weight={800} className={styles.sectionTitle}>Шрифт</Text>
            <Select
              selected={formSettings.fontFamilyOption}
              options={fontFamilyOptions.filter(opt => 
                opt.value !== formSettings.fontFamilyOption.value
              )}
              placeholder="Выберите шрифт"
              onChange={(option) => handleChange('fontFamilyOption', option)}
            />
          </div>
          
          <Separator className={styles.separator} />     
          
          <div className={styles.section} style={{ marginBottom: '50px' }}>
            <Text size={16} weight={800} className={styles.sectionTitle}>РАЗМЕР ШРИФТА</Text>
            <RadioGroup
              name="fontSize"
              selected={formSettings.fontSize}
              options={fontSizeOptions.map(opt => ({ 
                value: opt.value, 
                title: opt.title 
              }))}
              onChange={handleFontSizeChange}
            />
          </div>
          
          <Separator className={styles.separator} />
          
          <div className={styles.section} style={{ marginBottom: '100px' }}>
            <Text size={16} weight={800} className={styles.sectionTitle}>ЦВЕТ ШРИФТА</Text>
            <Select
              selected={formSettings.fontColor}
              options={fontColorOptions}
              placeholder="Выберите цвет текста"
              onChange={(option) => handleChange('fontColor', option)}
            />
          </div>
          
          <Separator className={styles.separator} />
          
          <div className={styles.section} style={{ marginBottom: '50px' }}>
            <Text size={16} weight={800} className={styles.sectionTitle}>ЦВЕТ ФОНА</Text>
            <Select
              selected={formSettings.backgroundColor}
              options={backgroundColorOptions}
              placeholder="Выберите цвет фона"
              onChange={(option) => handleChange('backgroundColor', option)}
            />
          </div>
          
          <Separator className={styles.separator} />
          
          <div className={styles.section}>
            <Text size={16} weight={800} className={styles.sectionTitle}>ШИРИНА КОНТЕНТА</Text>
            <Select
              selected={formSettings.contentWidth}
              options={contentWidthArr.filter(opt => 
                opt.value !== formSettings.contentWidth.value
              )}
              placeholder="Выберите ширину"
              onChange={(option) => handleChange('contentWidth', option)}
            />
          </div>
          
          <div className={styles.bottomContainer}>
            <Button 
              title='СБРОСИТЬ' 
              htmlType='reset' 
              type='clear' 
              onClick={handleReset}
            />
            <Button 
              title='ПРИМЕНИТЬ' 
              htmlType='submit' 
              type='apply'
            />
          </div>
        </form>
      </aside>
    </>
  );
};