const pageTitle = (() => {
  let _title = "UNSET";

  return {
    get: () => _title,
    set: (title: string) => _title = title
  }
})();

export default pageTitle;
