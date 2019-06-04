// This JavaScript File Is For CLient Side Use As Async Task

const deleteProduct = btn => {
  const productId = btn.parentNode.querySelector('[name=productId]').value;
  const csrf = btn.parentNode.querySelector('[name=_csrf]').value;
  console.log(csrf);
};
