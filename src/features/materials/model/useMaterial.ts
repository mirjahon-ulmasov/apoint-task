import { useEffect, useState } from "react";
import dayjs from "dayjs";
import type { Material } from "../types";
import { instance } from "../../../shared/api/base";

export const useMaterials = () => {
    const [data, setData] = useState<Material[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const start = dayjs().startOf("month").format("YYYY-MM-DD");
        const end = dayjs().endOf("month").format("YYYY-MM-DD");

        instance.get<Material[]>("/reports/reports/materials", {
            params: {
                sort: "name",
                start,
                end,
            },
        })
            .then((res) => setData(res.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    return { data, loading };
};
