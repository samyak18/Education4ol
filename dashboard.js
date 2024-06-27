window.onload = function() {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'login.html';
    }

    let users = {
        Harsh:{bankName: "SBI", accountNumber: "1234567890", ifscCode: "SBI123456", pendingFees:120000},
        Aditya:{bankName: "HDFC", accountNumber: "0987654321", ifscCode: "HDFC654321", pendingFees:330000},
        Aman:{bankName: "Canara bank", accountNumber: "0987654321", ifscCode: "CB654321", pendingFees:410000},
        Pratyush:{bankName: "ICICI", accountNumber: "0987654321", ifscCode: "ICICI654321", pendingFees:10000},
        Rachit:{bankName: "Yes", accountNumber: "0987654321", ifscCode: "Yes654321", pendingFees:20000},
         Sujeet: {bankName: "Bank of america", accountNumber: "0987654321", ifscCode: "BOA654321", pendingFees:40000},
    };

    const username = localStorage.getItem('username');
    const user = users[username];

    if (!user) {
        alert('User not found');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        window.location.href = 'login.html';
        return;
    }

    document.getElementById('bankName').innerText = `Bank Name: ${user.bankName}`;
    document.getElementById('accountNumber').innerText = `Account Number: ${user.accountNumber}`;
    document.getElementById('ifscCode').innerText = `IFSC Code: ${user.ifscCode}`;
    document.getElementById('pendingFees').innerText = `Your pending fees are $${user.pendingFees}`;

    document.getElementById('logoutButton').addEventListener('click', function() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        window.location.href = 'login.html';
    });

    document.getElementById('payNowButton').addEventListener('click', function() {
        document.getElementById('paymentForm').style.display = 'block';
    });

    document.getElementById('payForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const accountNumber = document.getElementById('inputAccountNumber').value;
        const amount = parseInt(document.getElementById('inputAmount').value, 10);
        const bankName = document.getElementById('inputBankName').value;
        const ifscCode = document.getElementById('inputIfscCode').value;

        if (amount === user.pendingFees) {
            alert(`Payment of $${amount} has been done successfully. Your pending fee is now $0.`);
            user.pendingFees = 0;
            document.getElementById('pendingFees').innerText = `Your pending fees are $${user.pendingFees}`;
        } else {
            alert(`Payment of $${amount} has been done successfully. However, your pending fee is not fully cleared.`);
        }
    });
};
