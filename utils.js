function getFormatedTime() {
  return new Date()
    .toLocaleString()
    .slice(0, 16)
    .replace(",", "")
    .replaceAll("/", "-");
}

function applyPagination(arr = [], page, limit) {
  if (limit == null) {
    return {
      data: arr,
      length: arr.length,
      totalNumberOfPages: 1,
    };
  }

  let data = [];
  let totalNumberOfPages = Math.ceil(arr.length / limit);

  if (page != null) {
    const start = limit * (page - 1);
    const end = start + limit;

    data = arr.slice(start, end);
  } else {
    // return latest data with limit
    data = arr.slice(-1 * limit);
  }

  return {
    data,
    length: data.length,
    totalNumberOfPages,
  };
}

module.exports = { getFormatedTime, applyPagination };
