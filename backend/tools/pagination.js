module.exports = async (model, conditions, params) => {
  const total = await model.count(conditions);
  const pageSize = parseInt(params.pageSize) || 10;
  const currentPage = parseInt(params.page) || 0;
  const pagination = {
    currentPage,
    pageSize,
    pages: parseInt(total / pageSize),
  };

  const results = await model
    .find(conditions)
    .skip(currentPage * pageSize)
    .sort({ createdAt: -1 })
    .limit(pageSize);

  return {
    data: results,
    pagination,
  };
};
