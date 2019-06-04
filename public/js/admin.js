// This JavaScript File Is For CLient Side Use As Async Task

const deleteProduct = btn => {
  const productId = btn.parentNode.querySelector('[name=productId]').value;
  const csrf = btn.parentNode.querySelector('[name=_csrf]').value;

  const productElement = btn.closest('article');

  fetch(`/admin/product/${productId}`, {
    method: 'DELETE',
    headers: {
      'csrf-token': csrf,
    },
  })
    .then(result => result.json())
    .then(data => {
      console.log(data);
      // not supported IE < 5
      productElement.remove();
    })
    .catch(err => {
      console.log(err);
    });
};
