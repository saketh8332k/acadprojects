document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("salesForm");
    const predictionText = document.getElementById("salesPrediction");
    const ctx = document.getElementById("salesChart").getContext("2d");
    let salesChart;

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        fetch("/predict", {
            method: "POST",
            body: new URLSearchParams(data),
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        })
        .then(response => response.json())
        .then(result => {
            const salesValue = result.Price;
            predictionText.textContent = salesValue.toFixed(2); // Update prediction display

            // Create or update the sales chart
            if (salesChart) {
                salesChart.destroy();
            }

            salesChart = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: ["Predicted Sales"],
                    datasets: [{
                        label: "Sales",
                        data: [salesValue],
                        backgroundColor: "rgba(54, 162, 235, 0.6)",
                        borderColor: "rgba(54, 162, 235, 1)",
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: { beginAtZero: true }
                    }
                }
            });
        })
        .catch(error => console.error("Error:", error));
    });
});
