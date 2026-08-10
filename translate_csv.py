#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Translate number.csv from Chinese (GBK) to English (UTF-8)
"""

import csv
import re

# Translation dictionary for common terms
TRANSLATIONS = {
    # Headers
    '佣金': 'Commission',
    '品牌': 'Brand',
    '产品名称': 'Product Name',
    '产品价格': 'Product Price',
    '产品链接': 'Product Link',
    '相关文章核心词': 'Core Keywords for Related Articles',
    '产品说明': 'Product Description',
    
    # Common section headers
    '想要搜索出这个产品需要搜索什么会显示呢': 'What searches will display this product',
    '搜索这款产品可以使用的关键词': 'Keywords to use when searching for this product',
    '根据亚马逊 SEO 和产品信息分析': 'Based on Amazon SEO and product analysis',
    '品牌 + 产品名搜索（转化率最高）': 'Brand + Product Name Search (Highest Conversion)',
    '功效类关键词': 'Efficacy Keywords',
    '肤质 + 需求类关键词（流量大）': 'Skin Type + Need Keywords (High Traffic)',
    '成分驱动型关键词': 'Ingredient-Driven Keywords',
    '场景 + 价位类关键词': 'Scenario + Price Range Keywords',
    '长尾词（搜索量小但转化率高）': 'Long-tail Keywords (Low Search Volume, High Conversion)',
    '竞品对标词（用于内容营销）': 'Competitor Comparison Keywords (For Content Marketing)',
    
    # Priority levels
    '优先级': 'Priority',
    '关键词': 'Keyword',
    '转化率': 'Conversion Rate',
    '推荐使用场景': 'Recommended Use Case',
    '极高': 'Extremely High',
    '高': 'High',
    '中高': 'Medium-High',
    '中': 'Medium',
    
    # Product sections
    '产品全称': 'Full Product Name',
    '核心功效与定位': 'Core Claims & Positioning',
    '核心成分与技术': 'Key Ingredients & Technology',
    '适用/慎用肤质': 'Skin Compatibility',
    '真实优缺点提炼': 'Pros & Cons from Customer Feedback',
    
    # Skin types
    '干性肌': 'Dry Skin',
    '油性肌': 'Oily Skin',
    '混合肌': 'Combination Skin',
    '敏感肌': 'Sensitive Skin',
    '中性肌': 'Normal Skin',
    '熟龄肌': 'Mature Skin',
    
    # Common terms
    '优点': 'Pros',
    '缺点': 'Cons',
    '优点 1': 'Pro 1',
    '优点 2': 'Pro 2',
    '优点 3': 'Pro 3',
    '缺点 1': 'Con 1',
    '缺点 2': 'Con 2',
    '用户反馈频率': 'User Feedback Frequency',
    '导购应对策略': 'Sales Guide Strategy',
    '主要投诉点': 'Main Complaint Points',
    '使用注意事项': 'Usage Notes',
    '使用技巧': 'Usage Tips',
    '成分亮点': 'Ingredient Highlights',
    '配方特点': 'Formula Features',
    '最适合肤质': 'Best For Skin Types',
    '慎用人群': 'Caution For',
    
    # Ratings
    '强烈推荐': 'Highly Recommended',
    '推荐': 'Recommended',
    '可用': 'Usable',
    '不推荐': 'Not Recommended',
    
    # Seasons
    '春夏': 'Spring/Summer',
    '秋冬': 'Fall/Winter',
    '四季': 'All Seasons',
    
    # Time periods
    '日间': 'Daytime',
    '夜间': 'Nighttime',
    '日常': 'Daily',
    
    # Price-related
    '价格区间': 'Price Range',
    '性价比': 'Value for Money',
    '高端': 'High-End',
    '中端': 'Mid-Range',
    '平价': 'Affordable',
    
    # Certifications
    '无酒精': 'Alcohol-Free',
    '无香精': 'Fragrance-Free',
    '无paraben': 'Paraben-Free',
    '纯素': 'Vegan',
    '零残忍': 'Cruelty-Free',
    '皮肤科医生测试': 'Dermatologist Tested',
}

def translate_text(text):
    """Translate Chinese text to English using dictionary mapping"""
    if not text or not isinstance(text, str):
        return text
    
    # Sort by length (longer phrases first) to avoid partial replacements
    sorted_keys = sorted(TRANSLATIONS.keys(), key=len, reverse=True)
    
    result = text
    for key in sorted_keys:
        result = result.replace(key, TRANSLATIONS[key])
    
    return result

def main():
    input_file = r'D:\Makeup-related\number.csv'
    output_file = r'D:\Makeup-related\number_en.csv'
    
    # Read the file with GBK encoding
    with open(input_file, 'r', encoding='gbk') as f:
        content = f.read()
    
    # Split into lines and process
    lines = content.split('\n')
    
    # Translate each line
    translated_lines = []
    for line in lines:
        translated_line = translate_text(line)
        translated_lines.append(translated_line)
    
    # Write to output file with UTF-8 encoding
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write('\n'.join(translated_lines))
    
    print(f"Translation complete!")
    print(f"Input: {input_file}")
    print(f"Output: {output_file}")
    print(f"Total lines processed: {len(translated_lines)}")

if __name__ == '__main__':
    main()
