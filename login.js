document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    let users = {
        Harsh: { password: 'Harsh@2004', bankName: "SBI", accountNumber: "1234567890", ifscCode: "SBI123456", pendingFees:120000},
        Aditya: { password:'Aditya@213', bankName: "HDFC", accountNumber: "0987654321", ifscCode: "HDFC654321", pendingFees:330000},
        Aman: { password: 'Aman@423', bankName: "Canara bank", accountNumber: "0987654321", ifscCode: "CB654321", pendingFees:410000},
        Pratyush: { password: 'Pratyush@111', bankName: "ICICI", accountNumber: "0987654321", ifscCode: "ICICI654321", pendingFees:10000},
        Rachit: { password: 'Rachit@222', bankName: "Yes", accountNumber: "0987654321", ifscCode: "Yes654321", pendingFees:20000},
        Sujeet: { password: 'Sujeet@233', bankName: "Bank of america", accountNumber: "0987654321", ifscCode: "BOA654321", pendingFees:40000},
    };

    if (users[username] && users[username].password === password) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        window.location.href = 'dashboard.html';
    } else {
        alert('Invalid username or password');
    }
});
