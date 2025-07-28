import React, { useState } from "react";
import type { Material } from "../types";
import styles from "./MaterialsTable.module.scss";

type Props = {
    data: Material[];
};

export const MaterialsTable: React.FC<Props> = ({ data }) => {
    const [expandedParents, setExpandedParents] = useState<Record<string, boolean>>({});
    const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

    const toggleParent = (parent: string) => {
        setExpandedParents(prev => ({ ...prev, [parent]: !prev[parent] }));
    };

    const toggleCategory = (category: string) => {
        setExpandedCategories(prev => ({ ...prev, [category]: !prev[category] }));
    };

    const grouped = data.reduce((acc, material) => {
        if (!material.parent || !material.category) return acc;

        if (!acc[material.parent]) acc[material.parent] = {};
        if (!acc[material.parent][material.category]) acc[material.parent][material.category] = [];

        acc[material.parent][material.category].push(material);
        return acc;
    }, {} as Record<string, Record<string, Material[]>>);

    const getAllMaterialsInParent = (categories: Record<string, Material[]>): Material[] => {
        return Object.values(categories).flat();
    };
    
    const sum = (items: Material[], key: keyof Material) => items.reduce((acc, item) => acc + Number(item[key] || 0), 0);

    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th rowSpan={2}>Наименование</th>
                    <th rowSpan={2}>Цвет</th>
                    <th rowSpan={2}>Ед изм</th>
                    <th rowSpan={2}>Артикул</th>
                    <th rowSpan={2}>Цена Учетная</th>
                    <th colSpan={2} style={{ backgroundColor: '#d5dfc7' }}>Сальдо начало периода</th>
                    <th colSpan={2} style={{ backgroundColor: '#c4daeb' }}>Приход</th>
                    <th colSpan={2} style={{ backgroundColor: '#f3cece' }}>Расход</th>
                    <th colSpan={2} style={{ backgroundColor: '#e3ebc4' }}>Сальдо на конец периода</th>
                </tr>
                <tr>
                    <th style={{ backgroundColor: '#d5dfc7' }}>Кол-во</th>
                    <th style={{ backgroundColor: '#d5dfc7' }}>Сумма</th>
                    <th style={{ backgroundColor: '#c4daeb' }}>Кол-во</th>
                    <th style={{ backgroundColor: '#c4daeb' }}>Сумма</th>
                    <th style={{ backgroundColor: '#f3cece' }}>Кол-во</th>
                    <th style={{ backgroundColor: '#f3cece' }}>Сумма</th>
                    <th style={{ backgroundColor: '#e3ebc4' }}>Кол-во</th>
                    <th style={{ backgroundColor: '#e3ebc4' }}>Сумма</th>
                </tr>
            </thead>
            <tbody>
                {Object.entries(grouped).map(([parent, categories]) => {
                    const allMaterials = getAllMaterialsInParent(categories);
                    return (
                        <React.Fragment key={parent}>
                            <tr className={styles.parentRow} onClick={() => toggleParent(parent)}>
                                <td>
                                    <strong>{expandedParents[parent] ? "▼" : "▶"} {parent}</strong>
                                </td>
                                <td colSpan={4} />
                                <td>{sum(allMaterials, "remind_start_amount")}</td>
                                <td>{sum(allMaterials, "remind_start_sum")}</td>
                                <td>{sum(allMaterials, "remind_income_amount")}</td>
                                <td>{sum(allMaterials, "remind_income_sum")}</td>
                                <td>{sum(allMaterials, "remind_outgo_amount")}</td>
                                <td>{sum(allMaterials, "remind_outgo_sum")}</td>
                                <td>{sum(allMaterials, "remind_end_amount")}</td>
                                <td>{sum(allMaterials, "remind_end_sum")}</td>
                            </tr>
                            {expandedParents[parent] &&
                                Object.entries(categories).map(([category, materials]) => (
                                    <React.Fragment key={category}>
                                        <tr className={styles.categoryRow} onClick={() => toggleCategory(category)}>
                                            <td>&nbsp;&nbsp;&nbsp;{expandedCategories[category] ? "▼" : "▶"} {category}</td>
                                            <td colSpan={4} />
                                            <td>{sum(materials, "remind_start_amount")}</td>
                                            <td>{sum(materials, "remind_start_sum")}</td>
                                            <td>{sum(materials, "remind_income_amount")}</td>
                                            <td>{sum(materials, "remind_income_sum")}</td>
                                            <td>{sum(materials, "remind_outgo_amount")}</td>
                                            <td>{sum(materials, "remind_outgo_sum")}</td>
                                            <td>{sum(materials, "remind_end_amount")}</td>
                                            <td>{sum(materials, "remind_end_sum")}</td>
                                        </tr>
                                        {expandedCategories[category] &&
                                            materials.map((material, index) => (
                                                <tr key={material.material_id}>
                                                    <td>{index + 1}. {material.name}</td>
                                                    <td>{material.color?.name || "-"}</td>
                                                    <td>{material.unit}</td>
                                                    <td>{material.code}</td>
                                                    <td>{material.last_price}</td>
                                                    <td>{material.remind_start_amount}</td>
                                                    <td>{material.remind_start_sum}</td>
                                                    <td>{material.remind_income_amount}</td>
                                                    <td>{material.remind_income_sum}</td>
                                                    <td>{material.remind_outgo_amount}</td>
                                                    <td>{material.remind_outgo_sum}</td>
                                                    <td>{material.remind_end_amount}</td>
                                                    <td>{material.remind_end_sum}</td>
                                                </tr>
                                            ))}
                                    </React.Fragment>
                                ))}
                        </React.Fragment>
                    );
                })}
            </tbody>
        </table>
    );
};
