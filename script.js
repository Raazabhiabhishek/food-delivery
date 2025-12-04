// Mobile Menu Toggle and Navbar Scroll Effect
const showMenu = document.getElementById('showMenu');
const closeMenu = document.getElementById('closeMenu');
const navLinks = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar');

// Mobile menu toggle
showMenu.addEventListener('click', () => {
    navLinks.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeMenu.addEventListener('click', () => {
    navLinks.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }
    });
});

// Close menu when clicking on a nav link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Menu Items Data
const menuItems = [
    {
        id: 1,
        name: 'Margherita Pizza',
        description: 'Classic pizza with tomato sauce, mozzarella, and basil',
        price: '₹120 rupees',
        image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
        category: 'pizza'
    },
    {
        id: 2,
        name: 'Cheeseburger',
        description: 'Juicy beef patty with cheddar, lettuce, and special sauce',
        price: '₹80 rupees',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
        category: 'burger'
    },
    {
        id: 3,
        name: 'Caesar Salad',
        description: 'Fresh romaine lettuce with Caesar dressing and croutons',
        price: '₹75 rupees',
        image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
        category: 'salad'
    },
    {
        id: 4,
        name: 'Pasta Carbonara',
        description: 'Spaghetti with creamy sauce, pancetta, and parmesan',
        price: '₹80 rupees',
        image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
        category: 'pasta'
    },
 {
    id: 5,
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with a molten center, served with ice cream',
    price: '₹95 rupees',
    image: 'https://www.foodandwine.com/thmb/JzCnKoNjLkG2nRwVSdFZoR2pEAs=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/molten-chocolate-cake-FT-RECIPE0220-0a33d7d0ab0c45588f7bfe742d33a9bc.jpg',
    category: 'dessert'
}

,
{
    id: 6,
    name: 'Iced Coffee',
    description: 'Chilled coffee with milk and sweetener',
    price: '₹65 rupees',
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
    category: 'drink'
}

];

// Display Menu Items
function displayMenuItems(items) {
    const menuGrid = document.querySelector('.menu-grid');
    menuGrid.innerHTML = '';
    
    items.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.classList.add('menu-item');
        menuItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="menu-item-content">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="price">
                    <span>${item.price}</span>
                    <button class="add-to-cart" data-id="${item.id}">Add to Cart</button>
                </div>
            </div>
        `;
        menuGrid.appendChild(menuItem);
    });    
    
    // Add event listeners to Add to Cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Add to Cart Function
function addToCart(e) {
    const button = e.target;
    const id = button.getAttribute('data-id');
    const item = menuItems.find(item => item.id === parseInt(id));
    
    // Animation
    button.textContent = 'Added!';
    button.style.backgroundColor = '#4CAF50';
    
    setTimeout(() => {
        button.textContent = 'Add to Cart';
        button.style.backgroundColor = '';
    }, 1500);
    
    // In a real app, you would add the item to a shopping cart
    console.log('Added to cart:', item);
}

// Initialize the page
function init() {
    // Display all menu items initially
    displayMenuItems(menuItems);
    
    // Add animation on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.category-card, .feature-card, .menu-item, .testimonial, .section-title');
        
        elements.forEach((element, index) => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial styles for animation
    document.addEventListener('DOMContentLoaded', () => {
        const elements = document.querySelectorAll('.category-card, .feature-card, .menu-item, .testimonial, .section-title');
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        });
        
        // Trigger initial animation
        setTimeout(animateOnScroll, 300);
    });
    
    // Listen for scroll events with throttling
    let isScrolling;
    window.addEventListener('scroll', () => {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
            animateOnScroll();
        }, 50);
    });
    
    // Initialize animations on page load
    window.addEventListener('load', () => {
        animateOnScroll();
        
        // Add loaded class to body for any load animations
        document.body.classList.add('loaded');
    });
}

// Initialize the application
init();
