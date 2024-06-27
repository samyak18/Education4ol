document.getElementById('payForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const accountNumber = document.getElementById('accountNumber').value;
    const amount = document.getElementById('amount').value;
    const bankName = document.getElementById('bankName').value;
    const ifscCode = document.getElementById('ifscCode').value;

    alert('Payment Successful!');

    sendEmailNotification(accountNumber, amount, bankName, ifscCode);
});

function sendEmailNotification(accountNumber, amount, bankName, ifscCode) {
    console.log('Sending email notification...');
    console.log(`Account Number: ${accountNumber}`);
    console.log(`Amount: ${amount}`);
    console.log(`Bank Name: ${bankName}`);
    console.log(`IFSC Code: ${ifscCode}`);
    console.log('Email sent: Payment Successful!');
}
