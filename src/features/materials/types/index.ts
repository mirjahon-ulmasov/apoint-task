export interface Material {
    name: string;
    material_id: number;
    color: Color | null;
    code: string;
    last_price: number;
    min_amount: number;
    category: string;
    parent: string;
    unit: string;
    width: string;

    remind_start_amount: number;
    remind_start_sum: number;
    remind_income_amount: number;
    remind_income_sum: number;
    remind_outgo_amount: number;
    remind_outgo_sum: number;
    remind_end_amount: number;
    remind_end_sum: number;
}

interface Color {
    color: string;
    colors_id: number;
    created_at: number;
    deleted_at: number;
    is_deleted: unknown;
    name: string;
    pantone: string;
    updated_at: number;
}