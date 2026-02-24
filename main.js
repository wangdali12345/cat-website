// 喵星球网站主要JavaScript功能

// 购物车功能
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// 更新购物车数量显示
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// 添加到购物车
function addToCart(product) {
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification('已添加到购物车');
}

// 显示通知
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 60px;
        left: 50%;
        transform: translateX(-50%);
        background: #0071e3;
        color: white;
        padding: 12px 24px;
        border-radius: 20px;
        font-size: 14px;
        z-index: 10000;
        animation: fadeInOut 3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// 导航栏滚动效果
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.8)';
    }
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translateX(-50%) translateY(-10px); }
        10% { opacity: 1; transform: translateX(-50%) translateY(0); }
        90% { opacity: 1; transform: translateX(-50%) translateY(0); }
        100% { opacity: 0; transform: translateX(-50%) translateY(-10px); }
    }
`;
document.head.appendChild(style);

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    
    // 为所有"加入购物车"按钮添加事件
    document.querySelectorAll('.product-card .btn-primary').forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            const productName = card.querySelector('h4').textContent;
            const productPrice = card.querySelector('.product-price').textContent;
            
            addToCart({
                name: productName,
                price: productPrice,
                quantity: 1
            });
        });
    });
    
    // 搜索功能
    const searchBtn = document.querySelector('.btn-search');
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            const searchTerm = prompt('请输入搜索关键词：');
            if (searchTerm) {
                showNotification(`正在搜索：${searchTerm}`);
            }
        });
    }
    
    // 购物车按钮点击
    const cartBtn = document.querySelector('.btn-cart');
    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                showNotification('购物车是空的');
            } else {
                showNotification(`购物车中有 ${cart.length} 件商品`);
            }
        });
    }
});

// 表单验证
function validateForm(form) {
    const inputs = form.querySelectorAll('input, select');
    let isValid = true;
    
    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#ff3b30';
        } else {
            input.style.borderColor = '#d2d2d7';
        }
    });
    
    return isValid;
}

// 处理表单提交
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm(form)) {
            showNotification('提交成功！');
            form.reset();
        } else {
            showNotification('请填写完整信息');
        }
    });
});