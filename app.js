// Listen For Submit
document.getElementById('loan-form').addEventListener('submit', function(e) {
  // Hide results
  document.getElementById('results').style.display = 'none';

  // Show Loading
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults, 1500);

  e.preventDefault();
});

// Calculating Results
function calculateResults()
{
  const amount = document.getElementById('amount');
  const interestRate = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedRate = parseFloat(interestRate.value)/100/12;
  const calculatedYears = parseFloat(years.value)*12;

  const x = Math.pow((1+calculatedRate), calculatedYears);
  const monthly = (principal*x*calculatedRate)/(x-1);

  if(isFinite(monthly))
  {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly*calculatedYears).toFixed(2);
    totalInterest.value = ((monthly*calculatedYears)-principal).toFixed(2);

    // Show results
    document.getElementById('results').style.display = 'block';

    // Hide Loader
    document.getElementById('loading').style.display = 'none';
  }
  else
  {
    showError('Please check your numbers');
  }
}

// Show Error
function showError(error)
{
  // Hide results
  document.getElementById('results').style.display = 'none';

  // Hide Loader
  document.getElementById('loading').style.display = 'none';

  // Create a div
  const errorDiv = document.createElement('div');

  // Get Elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  errorDiv.className = 'alert alert-danger';
  errorDiv.appendChild(document.createTextNode(error));

  // Insert Error above Heading
  card.insertBefore(errorDiv, heading);

  // Clear error after 3 seconds
  setTimeout(clearError, 3000);
}

// Clear Error
function clearError()
{
  document.querySelector('.alert').remove();
}