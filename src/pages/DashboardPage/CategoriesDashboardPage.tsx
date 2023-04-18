import { Col, Row, Button } from 'antd';
import { useState } from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { buttonStyle, secondaryButtonStyle } from '../../assets/styles/globalStyle';
import { ICategory } from '../../types';
import useCategories from '../../services/categories';
import { exportToCSV } from '../../utils/export-csv';
import SortAndFilter from '../../components/dashboard/categories/SortAndFilter';
import useTitle from '../../hooks/useTitle';
import CategoriesTable from '../../components/dashboard/categories/CategoriesTable';
import UpdateCategoryModal from '../../components/dashboard/categories/UpdateCategoryModal';
import AddCategoryModal from '../../components/dashboard/categories/AddCategoryModal';
export default function UsersDashboardPage() {
  const {
    fetchCategoriesQuery,
    categories,
    total,
    addCategoryMutation,
    deleteCategoryMutation,
    updateCategoryMutation,
    current,
    setCurrent,
    buildQuery,
    onFilterSearch,
    searchCategoriesQuery,
    onResetFilterSearch,
    itemPerPage,
    setItemPerPage,
  } = useCategories({ enabledFetchCategories: true });
  const [shouldAddModalOpen, setAddModelOpen] = useState(false);
  const [shouldUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);
  const { t } = useTranslation();
  useTitle(`${t('categories')} - 7FF`);

  const onAddCategory = (values: ICategory) => {
    addCategoryMutation.mutateAsync(values).finally(() => setAddModelOpen(false));
  };

  const onUpdateCategory = (values: ICategory) => {
    updateCategoryMutation.mutateAsync({ categoryId: selectedCategory?._id as string, data: values }).finally(() => setUpdateModalOpen(false));
  };

  const onDeleteCategory = (categoryId: string) => {
    deleteCategoryMutation.mutate(categoryId);
  };

  const onExportToCSV = () => exportToCSV(categories, `7FF_Categories_${Date.now()}`);

  return (
    <Row>
      <UpdateCategoryModal
        isLoading={updateCategoryMutation.isLoading}
        onSubmit={onUpdateCategory}
        category={selectedCategory}
        shouldOpen={shouldUpdateModalOpen}
        onCancel={() => setUpdateModalOpen(false)}
      />
      <AddCategoryModal
        onSubmit={onAddCategory}
        isLoading={addCategoryMutation.isLoading}
        shouldOpen={shouldAddModalOpen}
        onCancel={() => setAddModelOpen(false)}
      />

      <Col span={24}>
        <Row align="middle">
          <Col span={12}>
            <h2>{t('categories')}</h2>
          </Col>
          <Col span={12}>
            <Row align="middle" justify="end" gutter={8}>
              <Col span={5}>
                <SortAndFilter onChange={buildQuery} onSearch={onFilterSearch} onReset={onResetFilterSearch} />
              </Col>
              <Col span={5}>
                <Button block shape="round" style={{ ...secondaryButtonStyle }} onClick={() => setAddModelOpen(true)}>
                  <strong>+ {t('add')}</strong>
                </Button>
              </Col>
              <Col span={5}>
                <Button
                  block
                  icon={<DownloadOutlined style={{ marginRight: '4px' }} />}
                  type="text"
                  shape="round"
                  style={buttonStyle}
                  onClick={() => onExportToCSV()}
                >
                  <strong>{t('export csv')}</strong>
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>

        <CategoriesTable
          total={total as number}
          onDelete={onDeleteCategory}
          onSelectCategory={category => {
            setSelectedCategory(category);
            setUpdateModalOpen(true);
          }}
          isLoading={
            searchCategoriesQuery.isFetching ||
            fetchCategoriesQuery.isFetching ||
            deleteCategoryMutation.isLoading ||
            addCategoryMutation.isLoading ||
            updateCategoryMutation.isLoading
          }
          categories={categories}
          current={current}
          setCurrent={setCurrent}
          itemPerPage={itemPerPage}
          setItemPerPage={newItemPerPage => setItemPerPage(newItemPerPage)}
        />
      </Col>
    </Row>
  );
}
