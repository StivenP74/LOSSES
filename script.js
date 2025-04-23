document.addEventListener('DOMContentLoaded', function() {
    // Initialize electricity animations
    initElectricityAnimations();
    
    // Initialize dialog functionality
    initDialogs();

    // Initialize simple electric animations
    initElectricEffects();
});

function initElectricEffects() {
    // Create electric lines at regular intervals
    setInterval(createElectricLine, 2000);
    
    // Create initial electric lines
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            createElectricLine();
        }, 500 * i);
    }
}

function createElectricLine() {
    const overlay = document.getElementById('lightning-overlay');
    if (!overlay) return;
    
    // Create a new electric line
    const line = document.createElement('div');
    line.className = 'electric-line';
    
    // Set random position and angle
    const startY = Math.random() * 100;
    const angle = -30 + Math.random() * 60; // -30 to +30 degrees
    
    line.style.top = `${startY}%`;
    line.style.left = '0';
    line.style.transform = `rotate(${angle}deg)`;
    line.style.opacity = '0.7';
    
    overlay.appendChild(line);
    
    // Remove the line after animation completes
    setTimeout(() => {
        line.remove();
    }, 1500);
}

function initElectricityAnimations() {
    // Bulb animations
    const bulbs = document.querySelectorAll('.bulb');
    bulbs.forEach((bulb, index) => {
        // Set initial state
        bulb.style.opacity = 0.7;
        
        // Create glow animation
        setInterval(() => {
            const randomOpacity = 0.7 + Math.random() * 0.3;
            const randomShadow = `0 0 ${10 + Math.random() * 20}px var(--vistra-green)`;
            
            bulb.style.opacity = randomOpacity;
            bulb.style.boxShadow = randomShadow;
        }, 1000 + index * 300);
    });
    
    // Customer animations
    const customers = document.querySelectorAll('.customer');
    customers.forEach((customer, index) => {
        // Floating animation
        customer.style.animation = `float 3s infinite ease-in-out ${index * 0.7}s`;
        
        // Change expressions randomly
        const expressions = ['😊', '😄', '👍', '❤️', '✨'];
        setInterval(() => {
            const randomExpression = expressions[Math.floor(Math.random() * expressions.length)];
            customer.setAttribute('data-emoji', randomExpression);
            customer.style.setProperty('--emoji', `"${randomExpression}"`);
        }, 3000 + index * 1000);
    });
}

function initDialogs() {
    // Open dialog when button is clicked
    const buttons = document.querySelectorAll('.info-button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const dialogId = button.getAttribute('data-dialog');
            const dialog = document.getElementById(`${dialogId}-dialog`);
            if (dialog) {
                openDialog(dialog);
                
                // Add button press animation
                button.classList.add('pressed');
                setTimeout(() => {
                    button.classList.remove('pressed');
                }, 300);
            }
        });
    });
    
    // Close dialog when close button is clicked
    const closeButtons = document.querySelectorAll('.close-dialog');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const dialog = button.closest('.dialog-container');
            closeDialog(dialog);
        });
    });
    
    // Close dialog when clicking outside of it
    const dialogs = document.querySelectorAll('.dialog-container');
    dialogs.forEach(dialog => {
        dialog.addEventListener('click', (e) => {
            if (e.target === dialog) {
                closeDialog(dialog);
            }
        });
    });
}

function openDialog(dialog) {
    // Close any open dialogs first
    const activeDialogs = document.querySelectorAll('.dialog-container.active');
    activeDialogs.forEach(activeDialog => {
        closeDialog(activeDialog);
    });
    
    // Open the selected dialog
    dialog.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
    
    // Add entrance animation
    const dialogContent = dialog.querySelector('.dialog');
    dialogContent.style.animation = 'fadeInUp 0.3s forwards';
    
    // Create some electric lines when opening dialog
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createElectricLine();
        }, i * 100);
    }
}

function closeDialog(dialog) {
    dialog.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

// Hover effect for buttons
document.querySelectorAll('.info-button').forEach(button => {
    button.addEventListener('mouseover', () => {
        const iconContainer = button.querySelector('.icon-container');
        if (iconContainer) {
            iconContainer.style.animation = 'pulse 1s infinite';
        }
        
        // Create an electric effect when hovering
        createElectricLine();
    });
    
    button.addEventListener('mouseout', () => {
        const iconContainer = button.querySelector('.icon-container');
        if (iconContainer) {
            iconContainer.style.animation = '';
        }
    });
});

// Dynamic animation for electric borders on info buttons
function animateElectricBorders() {
    const buttons = document.querySelectorAll('.info-button');
    
    buttons.forEach(button => {
        const border = button.querySelector('.electric-border');
        if (!border) return;
        
        // Randomly make the border "spark"
        if (Math.random() > 0.95) {
            border.style.boxShadow = '0 0 10px var(--vistra-blue)';
            
            setTimeout(() => {
                border.style.boxShadow = '';
            }, 200);
        }
    });
}

// Call the electric border animation frequently
setInterval(animateElectricBorders, 100);