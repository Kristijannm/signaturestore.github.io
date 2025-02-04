//LocalStorage functionality

function addProductToCart(productId) {
    const productsUrl = "assets/products.json";
    let cartItems = localStorage.getItem("cartItems");
  
    if (cartItems) {
      cartItems = JSON.parse(cartItems);
    } else {
      cartItems = [];
    }
  
    fetch(productsUrl)
      .then((response) => response.json())
      .then((data) => {
        const foundProduct = data.find(
          (product) => product.id === parseInt(productId)
        );
  
        if (foundProduct) {
          const alreadyInCart = cartItems.some(
            (item) => item.id === foundProduct.id
          );
  
          if (alreadyInCart) {
            console.log("Product already in cart:", foundProduct);
            showNotification('Product already exists in the cart', true);
          } else {
            cartItems.push(foundProduct);
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
            showNotification('Product added to cart successfully');
            console.log("Product added to cart:", foundProduct);
            console.log("Updated cart items:", cartItems);
            LoadCartProducts(cartItems);
          }
        } else {
          console.log("Product with ID", productId, "not found.");
        }
      })
      .catch((error) => console.error("Error fetching products:", error));
  }
  
  function removeProductFromCart(productId) {
    let cartItems = localStorage.getItem("cartItems");
    let parsrdId = parseInt(productId);
    if (cartItems) {
      cartItems = JSON.parse(cartItems);
    } else {
      cartItems = [];
    }
  
    if (cartItems.length >= 1) {
      // Find the index of the product to remove
      const productIndex = cartItems.findIndex(
        (product) => product.id === parsrdId
      );
  
      if (productIndex !== -1) {
        // Remove the product from the cart
        cartItems.splice(productIndex, 1);
  
        // Update the list in local storage
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        LoadCartProducts(cartItems);
        console.log("Product removed from cart:", parsrdId);
        console.log("Updated cart items:", cartItems);
      } else {
        console.log("Product with ID", parsrdId, "not found in cart.");
      }
    }
  };

  // function showNotification(message, isError = false) {
  //   const notification = document.getElementById('notification');
  //   notification.textContent = message;
  //   notification.className = isError ? 'notification error show' : 'notification show';
  //   notification.style.display = 'block';
  
  //   setTimeout(() => {
  //     notification.classList.remove('show');
  //     setTimeout(() => {
  //       notification.style.display = 'none';
  //     }, 700); // Wait for the fade-out transition to complete before hiding
  //   }, 2500); // Show for 1 second
  // }
  function showNotification(message, isError = false) {
    const notificationContainer = document.getElementById('notification-container');

    const notification = document.createElement('div');
    notification.className = isError ? 'notification error' : 'notification';
    notification.textContent = message;

    notificationContainer.prepend(notification);

    // Use setTimeout to remove the notification after 2.5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 700); // Wait for the fade-out transition to complete before removing
    }, 2500); // Show for 2.5 seconds

    // Use requestAnimationFrame to ensure smooth transition on show
    requestAnimationFrame(() => {
        notification.classList.add('show');
    });
};

