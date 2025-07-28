import { useMaterials } from "../../features/materials/model/useMaterial";
import { MaterialsTable } from "../../features/materials/ui/MaterialsTable";

export const MaterialsPage = () => {
    const { data, loading } = useMaterials();

    if (loading) return <p>Загрузка...</p>;

    return <MaterialsTable data={data} />;
};
