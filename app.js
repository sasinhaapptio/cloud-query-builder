const app = document.getElementById('app');

// Datasets for AWS and Azure
const datasets = {
  aws: {
    title: 'AWS Query Builder',
    datasetOptions: ['CUR', 'CUR 2.0', 'Parquet'],
    dimensions: {
      'CUR': ['Currency Code', 'Invoice Date', 'Invoice ID', 'Date', 'Compute Usage Type', 'Engine', 'Instance Category', 'Instance Family', 'Instance Size', 'Instance Type', 'Lease Type', 'Operating System', 'Operation', 'Reservation Class', 'Reservaton ID', 'Resource ID', 'Tenancy', 'Transaction Type', 'Usage Type', 'Account ID', 'Availability Zone', 'Item Description', 'Payer Account ID', 'Product Name', 'Region', 'Seller', 'Service Name'],
      'CUR 2.0': ['Currency Code', 'Invoice Date', 'Invoice ID', 'Date', 'Compute Usage Type', 'Engine', 'Instance Category', 'Instance Family', 'Instance Size', 'Instance Type', 'Lease Type', 'Operating System', 'Operation', 'Reservation Class', 'Reservaton ID', 'Resource ID', 'Tenancy', 'Transaction Type', 'Usage Type', 'Account ID', 'Account Name', 'Availability Zone', 'Item Description', 'Payer Account ID', 'Payer Account Name', 'Product Name', 'Region', 'Seller', 'Service Name', 'Product_Region (UI)'],
      'Parquet': ['Currency Code', 'Invoice Date', 'Invoice ID', 'Date', 'Compute Usage Type', 'Engine', 'Instance Category', 'Instance Family', 'Instance Size', 'Instance Type', 'Lease Type', 'Operating System', 'Operation', 'Reservation Class', 'Reservaton ID', 'Resource ID', 'Tenancy', 'Transaction Type', 'Usage Type', 'Account ID', 'Account Name', 'Availability Zone', 'Item Description', 'Payer Account ID', 'Payer Account Name', 'Product Name', 'Region', 'Seller', 'Service Name']
    },
	metrics: {
	  'CUR': ['Cost(Total)', 'Cost(Amortized)'],
	  'CUR 2.0': ['Cost (Total)', 'Cost(Amortized)'],
	  'Parquet': ['Cost (Total)', 'Cost(Amortized)']
}


  },
  azure: {
    title: 'Azure Query Builder',
    datasetOptions: ['Azure_UD','Azure_EA'],
    dimensions: {
      'Azure_EA': ['Date', 'Instance Family', 'Instance Size', 'Instance Type', 'Lease Type', 'Operation', 'Reservaton ID', 'Resource ID', 'Transaction Type', 'Usage Type', 'Account ID', 'Account Name', 'Availability Zone', 'Item Description', 'Product Name', 'Region', 'Service Name', 'Resource GUID'],
      'Azure_UD': ['Currency Code', 'Invoice Date', 'Date', 'Instance Family', 'Instance Size', 'Instance Type', 'Lease Type', 'Operation', 'Reservaton ID', 'Resource ID', 'Transaction Type', 'Usage Type', 'Account ID', 'Account Name', 'Availability Zone', 'Azure Reservation Order Name', 'Item Description', 'Payer Account ID', 'Payer Account Name', 'Product Name', 'Region', 'Reservation Name', 'Resource Group', 'Seller', 'Service Name']
    },
    metrics: {
	  'Azure_EA': ['Cost(Total)'],
      'Combined': ['Cost(Total)', 'Cost(Amortized)'],
      'Cost': ['Cost(Total)'],
      'Amortized': ['Cost(Amortized)']
    }
  }
};

const cloudThemes = {
  aws: {
    primaryColor: "#dc9337",  // AWS orange
    background: "#eeeeee",
    textColor: "#333"
  },
  azure: {
    primaryColor: "#1d8ee0",  // Azure blue #5fa2d3
    background: "#eeeeee",
    textColor: "#222"
  }
};

// Global arrays to track the order of selections
let selectedDimensions = [];
let selectedMetrics = [];

// Pages
const routes = {
  '/': renderHome,
  '/aws': () => renderQueryPage('aws'),
  '/azure': () => renderQueryPage('azure')
};

// Routing
function router() {
  const hash = location.hash.replace('#', '') || '/';
  const route = routes[hash];
  if (route) {
    route();
  } else {
    app.innerHTML = '<h2>404 - Page Not Found</h2>';
  }
}

window.addEventListener('hashchange', router);
window.addEventListener('load', () => {
  router(); // existing routing setup

  // ✅ Initialize tsParticles ONCE globally
tsParticles.load("tsparticles", {
  fullScreen: { enable: false },
  background: {
    color: "#000000"
  },
  particles: {
    number: {
      value: 150,
      density: {
        enable: true,
        value_area: 1000
      }
    },
    color: {
      value: "#ffffff"
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: 0.8,
      random: true,
      animation: {
        enable: true,
        speed: 1,
        minimumValue: 0.1
      }
    },
    size: {
      value: 3,
      random: true,
      animation: {
        enable: true,
        speed: 5,
        minimumValue: 0.1
      }
    },
    links: {
      enable: true,
      distance: 150,
      color: "#f01616",
      opacity: 0.8,
      width: 1
    },
    move: {
      enable: true,
      speed: 0.3,
      direction: "none",
      random: false,
      straight: false,
      outMode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: ["grab"], // Enable both "grab" and "attract" on hover
      },
    },
    modes: {
      grab: {
        distance: 200,
        links: {
          opacity: 0.5
        }
      },
      push: {
       quantity: 4
      }
    }
  }
});
});

document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * 30;

  const bg = document.getElementById('bg-container');
  if (bg) {
    bg.style.backgroundPosition = `${50 + x}% ${50 + y}%`;
  }
});


// Render Home Page
function renderHome() {
  app.classList.add("fade-out");

  setTimeout(() => {
	document.body.style.backgroundColor = "#cfcfcf";
	document.body.style.color = "#cfcfcf";
    document.documentElement.style.setProperty('--primary-color', '#000');

app.innerHTML = `
  <h1 class="main-title">"BOB THE BUILDER"</h1>
  <p class="subtitle">Generate databricks queries easily based on your cloud.</p>
  <h2>Select a Cloud Provider</h2>
  <div class="home-buttons animate-title">
    <button class="cloud-btn aws-btn" onclick="location.hash = '#/aws'">
      <img src="https://logos-world.net/wp-content/uploads/2021/08/Amazon-Web-Services-AWS-Logo.png" alt="AWS" />
      AWS
    </button>
    <button class="cloud-btn azure-btn" onclick="location.hash = '#/azure'">
      <img src="https://swimburger.net/media/ppnn3pcl/azure.png" alt="Azure" />
      Azure
    </button>
  </div>
`;


    requestAnimationFrame(() => {
      app.classList.remove("fade-out");
      app.classList.add("fade-in");
      setTimeout(() => app.classList.remove("fade-in"), 400);
    });
  });



}

const dimensionMappings = {
  AWS: {
    'CUR': {
		'Currency Code': 'lineItem/CurrencyCode',
		'Invoice Date': 'bill/BillingPeriodStartDate',
		'Invoice ID': 'bill/InvoiceId',
		'Date': 'lineItem/UsageStartDate',
		'Compute Usage Type': 'lineItem/UsageType',
		'Engine': 'product/databaseEngine',
		'Instance Category': 'product/instanceFamily',
		'Instance Family': 'product/instanceTypeFamily',
		'Instance Size': 'product/instanceType',
		'Instance Type': 'product/instanceType',
		'Lease Type': 'pricing/term',
		'Operating System': 'product/operatingSystem',
		'Operation': 'lineItem/Operation',
		'Reservation Class': 'pricing/OfferingClass',
		'Reservaton ID': 'savingsPlan/SavingsPlanARN',
		'Resource ID': 'lineItem/ResourceId',
		'Tenancy': 'product/tenancy',
		'Transaction Type': 'lineItem/LineItemType',
		'Usage Type': 'lineItem/UsageType',
		'Account ID': 'lineItem/UsageAccountId',
		'Availability Zone': 'lineItem/AvailabilityZone',
		'Item Description': 'lineItem/LineItemDescription',
		'Payer Account ID': 'bill/PayerAccountId',
		'Product Name': 'product/ProductName',
		'Region': 'product/region',
		'Seller': 'bill/BillingEntity',
		'Service Name': 'product/servicename'
    },
    'CUR 2.0': {
		'Currency Code': 'line_item_currency_code',
		'Invoice Date': 'bill_billing_period_start_date',
		'Invoice ID': 'bill_invoice_id',
		'Date': 'line_item_usage_start_date',
		'Compute Usage Type': 'line_item_usage_type',
		'Engine': 'product_instancesku',
		'Instance Category': 'reservation_number_of_reservations',
		'Instance Family': 'reservation_number_of_reservations',
		'Instance Size': 'reservation_number_of_reservations',
		'Instance Type': 'reservation_number_of_reservations',
		'Lease Type': 'pricing_term',
		'Operating System': 'product_fee_description',
		'Operation': 'line_item_operation',
		'Reservation Class': 'pricing_offering_class',
		'Reservaton ID': 'savings_plan_total_commitment_to_date',
		'Resource ID': 'line_item_resource_id',
		'Tenancy': 'product_sku',
		'Transaction Type': 'line_item_line_item_type',
		'Usage Type': 'line_item_usage_type',
		'Account ID': 'line_item_usage_account_id', 
		'Account Name': 'line_item_usage_account_name',
		'Availability Zone': 'line_item_availability_zone',
		'Item Description': 'line_item_line_item_description',
		'Payer Account ID': 'bill_payer_account_id', 
		'Payer Account Name': 'bill_payer_account_name',
		'Product Name': 'product_region_code',
		'Region': 'product_to_region_code',
		'Seller': 'bill_billing_entity',
		'Service Name': 'line_item_product_code',
		'Product_Region (UI)': 'product_region_code'
    },
    'Parquet': {
		'Currency Code': 'line_item_currency_code',
		'Invoice Date': 'bill_billing_period_start_date',
		'Invoice ID': 'bill_invoice_id',
		'Date': 'line_item_usage_start_date',
		'Compute Usage Type': 'line_item_usage_type',
		'Engine': 'product_database_engine',
		'Instance Category': 'product_instance_family',
		'Instance Family': 'product_instance_type_family',
		'Instance Size': 'product_instance_type',
		'Instance Type': 'product_instance_type',
		'Lease Type': 'pricing_term',
		'Operating System': 'product_operating_system',
		'Operation': 'line_item_operation',
		'Reservation Class': 'pricing_offering_class',
		'Reservaton ID': 'savings_plan_total_commitment_to_date',
		'Resource ID': 'line_item_resource_id',
		'Tenancy': 'product_tenancy',
		'Transaction Type': 'line_item_line_item_type',
		'Usage Type': 'line_item_usage_type',
		'Account ID': 'line_item_usage_account_id', 
		'Account Name': 'line_item_usage_account_name',
		'Availability Zone': 'line_item_availability_zone',
		'Item Description': 'line_item_line_item_description',
		'Payer Account ID': 'bill_payer_account_id', 
		'Payer Account Name': 'bill_payer_account_name',
		'Product Name': 'product_product_name',
		'Region': 'product_region',
		'Seller': 'bill_billing_entity',
		'Service Name': 'product_servicename'
    }
  },
  Azure: {
    'Azure_EA': {
      	'Date': 'Date',
		'Instance Family': 'AdditionalInfo',
		'Instance Size': 'AdditionalInfo',
		'Instance Type': 'AdditionalInfo',
		'Lease Type': 'pricingModel',
		'Operation': 'MeterName',
		'Reservaton ID': 'AdditionalInfo',
		'Resource ID': 'InstanceId',
		'Transaction Type': 'chargeType',
		'Usage Type': 'meterCategory',
		'Account ID': 'SubscriptionGuid', 
		'Account Name': 'SubscriptionName',
		'Availability Zone': 'MeterRegion',
		'Item Description': 'AdditionalInfo',
		'Product Name': 'ConsumedService',
		'Region': 'ResourceLocation',
		'Service Name': 'ConsumedService',
		'Resource GUID': 'ResourceGuid'
    },
    'Azure_UD': {
		'Currency Code': 'BillingCurrencyCode',
		'Invoice Date': 'billingPeriodStartDate',
		'Date': 'date',
		'Instance Family': 'AdditionalInfo',
		'Instance Size': 'AdditionalInfo',
		'Instance Type': 'AdditionalInfo',
		'Lease Type': 'pricingModel',
		'Operation': 'meterName',
		'Reservaton ID': 'reservationId',
		'Resource ID': 'ResourceId',
		'Transaction Type': 'chargeType',
		'Usage Type': 'meterCategory',
		'Account ID': 'SubscriptionId', 
		'Account Name': 'subscriptionName',
		'Availability Zone': 'resourceLocation',
		'Azure Reservation Order Name': 'productOrderName',
		'Item Description': 'ProductName',
		'Payer Account ID': 'billingAccountId', 
		'Payer Account Name': 'billingAccountName',
		'Product Name': 'ConsumedService',
		'Region': 'resourceLocation',
		'Reservation Name': 'reservationName',
		'Resource Group': 'resourceGroup',
		'Seller': 'publisherType',
		'Service Name': 'ConsumedService'
    }
  }
};


const metricMappings = {
  AWS: {
    'Cost(Total)': 'lineItem/UnblendedCost',
    'Cost (Total)': 'line_item_unblended_cost'
  },
  Azure: {
    Azure_EA: {
      'Cost(Total)': 'Cost',
    },
    Azure_UD: {
      Cost: {
        'Cost(Total)': 'costInBillingCurrency'
      },
      Amortized: {
        'Cost(Amortized)': 'costInBillingCurrency'
      },
      Combined: {
        'Cost(Total)': 'costInBillingCurrency',
        'Cost(Amortized)': 'amortizedCost'
      }
    }
  }
};


// Render AWS or Azure Page
function renderQueryPage(cloud) {
  const theme = cloudThemes[cloud];

  // Start fade-out
  app.classList.add("fade-out");

  setTimeout(() => {
    // Apply cloud theme
    document.body.style.backgroundColor = theme.background;
    document.body.style.color = theme.textColor;
    document.documentElement.style.setProperty('--primary-color', theme.primaryColor);
	document.documentElement.style.setProperty('--glider-color', theme.primaryColor);
	window.currentCloud = cloud;
	
	selectedDimensions = [];
	selectedMetrics = [];


  const data = datasets[cloud];
	let defaultDataset = data.datasetOptions[0]; // e.g., "CUR" or "EU"
	window.currentDataset = defaultDataset;
  app.innerHTML = `
  <h1>${data.title}</h1>
<!-- Dataset Selector -->
<div class="custom-dropdown">
  <label for="datasetSelect">Choose File Type:</label>
  <select id="datasetSelect">
    ${data.datasetOptions.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
  </select>
</div>
<div id="fileTypeContainer" class="custom-dropdown hidden">
  <label for="fileTypeSelect">CSV Type:</label>
  <select id="fileTypeSelect">
    <option value="Combined">Combined</option>
    <option value="Cost">Cost</option>
    <option value="Amortized">Amortized</option>
  </select>
</div>

<!-- Customer Input -->
<div class="custom-dropdown">
  <label for="customerInput">Table Name:</label>
  <input type="text" id="customerInput" placeholder="Enter customer table name" />
</div>

<!-- Dimensions -->
<div class="custom-dropdown">  
  <label>Dimensions (Max 10):</label>
  <div class="dropdown" id="dimensionDropdown">
    <div class="dropdown-toggle" onclick="toggleDropdown('dimensionMenu')">Select Dimensions</div>
    <div class="dropdown-menu" id="dimensionMenu">
      <!-- Will be populated by renderDimensionOptions() -->
    </div>
  </div>
  <div id="dimensionPreview" class="selection-preview"></div>
</div>

<!-- Metrics -->

<div class="custom-dropdown">
  <label>Metrics (Max 2):</label>
  <div class="dropdown" id="metricDropdown">
    <div class="dropdown-toggle" onclick="toggleDropdown('metricMenu')">Select Metrics</div>
    <div class="dropdown-menu" id="metricMenu"></div>
  </div>
  <div id="metricPreview" class="selection-preview"></div>
</div>

<!-- Toggle for Tag Filtering -->
<div style="display: flex; justify-content: center; margin-bottom: 1rem;">
  <label>Add Tags</label>
  <input type="checkbox" id="enableTags" />
</div>
<!-- 🔖 Tag Filters -->
<div class="tag-section" style="margin-bottom: 1.5rem; display: none;">
<!-- <label style="font-size: 13px; color: red; margin-bottom: 0.1rem;">(Make sure to enter the Tag Key name and not the Tag Dimension)</label> -->
   <div id="tagInputs" style="display: flex; flex-wrap: wrap; gap: 0.1rem; justify-content: center;">
    <div class="flex items-center gap-2">
<div class="tag-field-wrapper" style="display: flex; align-items: center; gap: 0.5rem;">
  <input type="text" class="tag-input" placeholder="Enter Tag Key" />
  <button type="button" style="color: red;" onclick="this.parentElement.remove()">❌</button>
</div>
    </div>
  </div>
  <button id="addTagBtn" class="primary-button" style="margin-top: 0.5rem; padding: 6px 12px; border: none; cursor: pointer; rounded text-white">
    ➕ Add Tag Field
  </button>
  <!-- 🏷️ Tag Condition Toggle -->
<div style="display: flex; justify-content: center; align-items: center; margin-top: 1rem; margin-bottom: 1rem; gap: 0.5rem;">
  <label>Tag Condition:</label>
  <input type="checkbox" id="tagConditionToggle" />
</div>

<!-- 🛠️ Tag Condition Builder -->
<div id="tagConditionContainer" class="hidden" style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
  <div id="tagConditionInputs" style="display: flex; flex-direction: column; gap: 0.5rem;"></div>
  <button id="addTagCondition" class="primary-button" style="  margin-top: 0.5rem;  padding: 6px 12px;  border: none;  cursor: pointer;  color: white;  background-color: var(--primary-color, #007bff);
  border-radius: 4px;  transition: background-color 0.3s ease;">
  ➕ Add Tag Condition
</button>
</div>
</div>
<div id="tagErrorMsg" style="color: red; font-weight: bold; display: none; margin-bottom: 0.5rem;"></div>
<!-- 📋 Paste Schema -->
<div class="schema-section" style="margin-bottom: 1.5rem; display: none;">
    <!-- <label for="schemaInput" style="font-weight: 200; display: block; margin-bottom: 0.5rem;">   </label> -->
  <textarea id="schemaInput" rows="4" placeholder="Paste your schema here..." style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 6px;"></textarea>
</div>


<div class="where-toggle">
  <label for="whereToggle">Add Where Clauses:</label>
  <input type="checkbox" id="whereToggle" />
</div>

<div id="whereContainer" class="hidden">
  <!-- The card for the WHERE conditions -->
  <div id="whereCard" class="where-card">
    <div id="whereInputs"></div>
  </div>

  <!-- Add Condition button outside the card -->
  <div class="where-actions">
    <button id="addWhere">➕ Add Condition</button>
	<div style="margin-bottom: 10px;"></div> <!-- adds space below -->
  </div>
</div>

<div class="custom-dropdown" id="orderSelector" style="margin-bottom: 1rem;">
  <div style="display: flex; align-items: center; gap: 1rem;">
    <select id="customOrderField">
      <option value="" disabled selected hidden>Sort By</option>
    </select>
<div class="single-tab-toggle">
  <input type="radio" id="asc" name="orderDirection" value="ASC" checked>
  <input type="radio" id="desc" name="orderDirection" value="DESC">

  <div class="slider-tab">
    <label for="asc" class="option asc">Asc</label>
    <label for="desc" class="option desc">Desc</label>
    <div class="glider"></div>
  </div>
</div>
  </div>
</div>

<button id="createQuery" style="background-color: #080000; color: white;">
  <span>Create Query</span>
  <span id="queryLoading" class="spinner hidden"></span>
</button>



<div id="outputContainer" class="hidden">
  <div class="output-header">
    <span>Generated Query</span>
    <button id="copyBtn">📋 Copy</button>
  </div>
  <pre><code id="output" class="sql output-box hljs"></code></pre>
  <span id="copyMsg" class="copy-msg hidden">Thanks Come Again!</span>
</div>


  <div class="nav-buttons">
	<button onclick="goHome()">← Home</button>
  </div>
`;

  initLogic();
  
  renderDimensionOptions(); 
  renderMetricOptions();
/* --- HIDE TAG CONDITION BLOCK FOR AZURE ONLY --- */
if (cloud === "azure") {
    const tagConditionToggle = document.getElementById("tagConditionToggle");
    const tagConditionLabel = tagConditionToggle?.closest("div"); 
    const tagConditionContainer = document.getElementById("tagConditionContainer");

    if (tagConditionLabel) tagConditionLabel.style.display = "none";
    if (tagConditionContainer) tagConditionContainer.style.display = "none";
}
  
  if (cloud === 'azure') {
  const fileTypeContainer = document.getElementById("fileTypeContainer");
  const fileTypeSelect = document.getElementById("fileTypeSelect");

  const updateFileTypeVisibility = () => {
    const selectedDataset = document.getElementById("datasetSelect").value;
    if (selectedDataset === "Azure_UD") {
      fileTypeContainer.classList.remove("hidden");
      renderMetricOptions(fileTypeSelect.value); // show based on selected file type
    } else {
      fileTypeContainer.classList.add("hidden");
      renderMetricOptions(); // fallback to default
    }
  };


  // Update on dataset or fileType change
  document.getElementById("datasetSelect").addEventListener("change", updateFileTypeVisibility);
  fileTypeSelect.addEventListener("change", () => {
    renderMetricOptions(fileTypeSelect.value);
  });

  updateFileTypeVisibility(); // initialize visibility
}
// Reset everything after changing the File Type
document.getElementById("datasetSelect").addEventListener("change", (e) => {
  window.currentDataset = e.target.value;
  document.getElementById("customerInput").value = "";  // Reset Customer input
  renderDimensionOptions();
  renderMetricOptions();
  initFileTypeDropdown();

  // ✅ Reset WHERE clause
  const whereToggle = document.getElementById("whereToggle");
  const whereContainer = document.getElementById("whereContainer");
  const whereInputs = document.getElementById("whereInputs");

  whereToggle.checked = false;
  whereContainer.classList.add("hidden");
  whereInputs.innerHTML = "";

  // ✅ Reset Add Tags section
  const tagToggle = document.getElementById("enableTags");
  const tagSection = document.querySelector(".tag-section");
  const schemaSection = document.querySelector(".schema-section");
  const tagInputs = document.getElementById("tagInputs");
  const schemaInput = document.getElementById("schemaInput");
  const tagErrorMsg = document.getElementById("tagErrorMsg");

  tagToggle.checked = false;
  tagSection.style.display = "none";
  schemaSection.style.display = "none";
  tagInputs.innerHTML = "";
  schemaInput.value = "";
  tagErrorMsg.style.display = "none";

  // ✅ Reset Tag Condition
  const tagConditionToggle = document.getElementById("tagConditionToggle");
  const tagConditionContainer = document.getElementById("tagConditionContainer");
  const tagConditionInputs = document.getElementById("tagConditionInputs");

  tagConditionToggle.checked = false;
  tagConditionContainer.classList.add("hidden");
  tagConditionInputs.innerHTML = "";

  // ✅ Reset Output Query
  const outputContainer = document.getElementById("outputContainer");
  const outputBox = document.getElementById("output");

  outputContainer.classList.add("hidden");
  outputBox.textContent = "";
});

  
  // Trigger fade-in
    requestAnimationFrame(() => {
      app.classList.remove("fade-out");
      app.classList.add("fade-in");

      // Remove the class after animation completes (optional cleanup)
      setTimeout(() => app.classList.remove("fade-in"), 400);
    });
  }, 300); // match with fade-out time  
}


function goHome() {
  app.classList.add("fade-out");

  setTimeout(() => {
    location.hash = '#/';

    setTimeout(() => {
      app.classList.remove("fade-out");
      app.classList.add("fade-in");

      setTimeout(() => app.classList.remove("fade-in"), 400);
    }, 50); // Allow DOM to render
  }, 300); // Matches .fade-out duration
}

function renderDimensionOptions() {
  const cloud = window.currentCloud;
  const dataset = window.currentDataset;
  const dimContainer = document.getElementById("dimensionMenu");

  // ✅ ADD DEBUG LOGS
  console.log("🌩️ Cloud:", cloud);
  console.log("📦 Dataset:", dataset);
  console.log("📐 Dimensions Array:", datasets[cloud]?.dimensions[dataset]);

  // ✅ ADD A GUARD
  const dimensionList = datasets[cloud]?.dimensions[dataset];
  if (!dimensionList || !Array.isArray(dimensionList)) {
    dimContainer.innerHTML = "<p>No dimensions available for selected dataset.</p>";
    return;
  }

  // Clear previous selection state
  selectedDimensions = [];
  updateSelectionPreview();

  // ✅ KEEP YOUR EXISTING RENDER LOGIC
  dimContainer.innerHTML = dimensionList.map(dim => `
    <label>
      <input type="checkbox" class="dimension-option" value="${dim}" onchange="handleLimit(this, 'dimension-option', 10); updateSelectionPreview();"> ${dim}
    </label>
  `).join('');
  
  updateOrderByDropdown();
}
function initFileTypeDropdown() {
  const fileTypeSelect = document.getElementById("fileTypeSelect");
  const fileTypeContainer = document.getElementById("fileTypeContainer");

  const isAzureUD = window.currentCloud === "azure" && window.currentDataset === "Azure_UD";
  fileTypeContainer.classList.toggle("hidden", !isAzureUD);

  if (isAzureUD) {
    fileTypeSelect.removeEventListener("change", onFileTypeChange);
    fileTypeSelect.addEventListener("change", onFileTypeChange);
    renderMetricOptions(fileTypeSelect.value);
  } else {
    renderMetricOptions();
  }

  function onFileTypeChange(e) {
    selectedMetrics = [];
	selectedDimensions = []; 
    renderMetricOptions(e.target.value);
	renderDimensionOptions(); 
    updateSelectionPreview();
  }
}

function renderMetricOptions(fileType = 'Combined') {
	selectedMetrics = []; // Clear selected metrics
  const cloud = window.currentCloud;
  const metricContainer = document.getElementById("metricMenu");

  selectedMetrics = [];
  updateSelectionPreview();

  let metricOptions = [];

  if (cloud === 'azure' && window.currentDataset === 'Azure_UD') {
    metricOptions = datasets.azure.metrics[fileType] || [];
  } else if (cloud === 'azure') {
    metricOptions = datasets.azure.metrics['Combined'];
  } else if (cloud === 'aws') {
    const dataset = window.currentDataset;
    metricOptions = datasets.aws.metrics[dataset] || [];
  }

  // Remove "Cost(Amortized)" if Azure_EA is selected
  if (cloud === 'azure' && window.currentDataset === 'Azure_EA') {
    metricOptions = metricOptions.filter(m => m !== 'Cost(Amortized)');
  }

  metricContainer.innerHTML = metricOptions.map(metric => {
    const extra = (cloud === 'aws') ? `handleAmortizedEffect();` : ``;
    return `
      <label>
        <input type="checkbox" class="metric-option" value="${metric}" onchange="handleLimit(this, 'metric-option', 2); updateSelectionPreview(); ${extra}"> ${metric}
      </label>
    `;
  }).join('');
  
  // Reset all disabling effects from previous Amortized selection
const dimensionSection = document.getElementById("dimensionDropdown");
const whereToggle = document.getElementById("whereToggle");
const whereContainer = document.getElementById("whereContainer");

// Enable all dimension and metric checkboxes
document.querySelectorAll(".dimension-option").forEach(input => {
  input.disabled = false;
});
document.querySelectorAll(".metric-option").forEach(input => {
  input.disabled = false;
});

// Reset dimension/where UI states
dimensionSection.classList.remove("disabled");
whereToggle.disabled = false;

updateOrderByDropdown();

}

function updateMetricOptions(fileType = 'Combined') {
  renderMetricOptions(fileType);
}

// Add interactivity to query page
function initLogic() {
  const toggle = document.getElementById("whereToggle");
  const whereContainer = document.getElementById("whereContainer");
  const whereInputs = document.getElementById("whereInputs");
  const addWhereBtn = document.getElementById("addWhere");

 toggle.addEventListener("change", () => {
  document.getElementById("whereContainer").classList.toggle("hidden", !toggle.checked);
});

addWhereBtn.addEventListener("click", () => {
  const dimensions = [...document.querySelectorAll('.dimension-option')].map(input => input.value);

  const inputGroup = document.createElement("div");
  inputGroup.className = "where-group";

  inputGroup.innerHTML = `
    <select class="where-dimension">
      ${dimensions.map(dim => `<option value="${dim}">${dim}</option>`).join('')}
    </select>

    <select class="where-operator">
      <option value="=">Equals</option>
      <option value="!=">Not Equals</option>
      <option value="LIKE">Contains</option>
      <option value="NOT LIKE">Does Not Contain</option>
      <option value="IS NULL">Is Null</option>
      <option value="IS NOT NULL">Is Not Null</option>
    </select>

    <input type="text" class="where-value" placeholder="Value (optional)" />

    <select class="join-operator">
      <option value="AND">AND</option>
      <option value="OR">OR</option>
    </select>

    <button class="remove-btn">x</button>
  `;

  whereInputs.appendChild(inputGroup);
  updateJoinVisibility(); // 👈 Manage visibility of the join operators

  const operatorSelect = inputGroup.querySelector('.where-operator');
  const valueInput = inputGroup.querySelector('.where-value');
  operatorSelect.addEventListener('change', () => {
    valueInput.disabled = (operatorSelect.value === 'IS NULL' || operatorSelect.value === 'IS NOT NULL');
  });

  inputGroup.querySelector(".remove-btn").addEventListener("click", () => {
    inputGroup.remove();
    updateJoinVisibility();
  });
});


function updateJoinVisibility() {
  const groups = document.querySelectorAll(".where-group");
  groups.forEach((group, idx) => {
    const joinSelect = group.querySelector(".join-operator");
    if (joinSelect) {
      if (idx === groups.length - 1) {
        joinSelect.style.display = "none";
        joinSelect.disabled = true; // 👈 important
      } else {
        joinSelect.style.display = "inline-block";
        joinSelect.disabled = false;
      }
    }
  });
}

// 🧠 Set button color based on cloud provider
const addTagBtn = document.getElementById("addTagBtn");
if (window.currentCloud === 'aws') {
  addTagBtn.style.backgroundColor = '#db8f1d'; // AWS orange
} else if (window.currentCloud === 'azure') {
  addTagBtn.style.backgroundColor = '#3993ed'; // Azure blue
}

// Add more tag input fields
document.getElementById("addTagBtn").addEventListener("click", () => {
  const container = document.getElementById("tagInputs");

  const wrapper = document.createElement("div");
  wrapper.className = "tag-field-wrapper";
  wrapper.style.display = "flex";
  wrapper.style.alignItems = "center";
  wrapper.style.gap = "0.5rem";

  const input = document.createElement("input");
  input.type = "text";
  input.className = "tag-input";
  input.placeholder = "Enter Tag Key";

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "❌";
  removeBtn.style.color = "red";
  removeBtn.addEventListener("click", () => {
    const total = document.querySelectorAll("#tagInputs .tag-field-wrapper").length;
    if (total > 1) {
      wrapper.remove();
      updateRemoveButtons();
    }
  });

  wrapper.appendChild(input);
  wrapper.appendChild(removeBtn);
  container.appendChild(wrapper);

  updateRemoveButtons();
});

function updateRemoveButtons() {
  const wrappers = document.querySelectorAll("#tagInputs .tag-field-wrapper");
  wrappers.forEach((wrap, index) => {
    const removeBtn = wrap.querySelector("button");
    removeBtn.style.display = (wrappers.length > 1) ? "inline-block" : "none";
  });
}

// Call once after page load if there's already one input field
updateRemoveButtons();


document.getElementById("createQuery").addEventListener("click", () => {
  const cloud = (window.currentCloud || "aws").toLowerCase();
  const cloudKey = cloud === "aws" ? "AWS" : "Azure";
  
  // TWO LINES to sync arrays with latest drag order
  updateArrayFromTags("dimensionPreview", selectedDimensions);
  updateArrayFromTags("metricPreview", selectedMetrics);
  
const tagInputs = [...document.querySelectorAll('.tag-input')];
const tagValues = tagInputs.map(input => input.value.trim()).filter(Boolean);

const tagToggleChecked = document.getElementById("enableTags").checked;
const schemaText = document.getElementById("schemaInput").value;
if (tagToggleChecked && schemaText.trim() === "") {
  alert("Schema NOT FOUND!");
  return;
}
//const schemaLines = schemaText.split("\n").filter(line => /\b(Tags|tags|resourceTags|resource_tags|resource_tags_aws|resource_tags_user)\b/.test(line));
const schemaLines = schemaText.split("\n").filter(line =>
  /resource_tags_(aws|user)_|resourceTags\/(aws|user)|Tags|tags|resourceTags|resource_tags:/i.test(line)
);
const tagKeysEntered = [...document.querySelectorAll('.tag-input')]
  .map(input => input.value.trim())
  .filter(Boolean);
const tagConditionsExist = document.getElementById("tagConditionToggle").checked &&
  document.querySelectorAll(".tag-where-group").length > 0;

// 🚨 Show alert if user expects tag logic but no tag lines are in schema
if ((tagKeysEntered.length > 0 || tagConditionsExist) && schemaLines.length === 0) {
  alert("No Tag lines present in the Schema");
  return;
}


let tagClause = "";
let tagSelectLines = [];

const extractFullFieldName = (line) => {
  const prefix = "|-- ";
  const suffix = ": string (nullable = true)";

  const startIdx = line.indexOf(prefix);
  const endIdx = line.indexOf(suffix);

  if (startIdx === -1 || endIdx === -1 || endIdx <= startIdx + prefix.length) {
    return null; // invalid format
  }

  return line.substring(startIdx + prefix.length, endIdx).trim();
};


const extractTagPrefix = (line) => {
  // More tolerant version that still extracts just the field name
  const fieldPart = line.split('|--')[1];
  return fieldPart ? fieldPart.split(':')[0].trim() : null;
};


let tagFieldLines = [];

if (tagValues.length > 0 && schemaLines.length > 0) {
tagFieldLines = schemaLines.filter(line => {
const lowerLine = line.toLowerCase();

return tagValues.some(tag => {
  const tagLower = tag.toLowerCase();

  // Special case: only include resourceTags/user:user
  if (tagLower === "user") {
    const match = lowerLine.match(/resourcetags\/user:([^:]+): string \(nullable = true\)/);
    return match?.[1] === "user"; // only match user:user
  }

  // Match suffix of underscore-prefixed tags
  const matchUnderscore = lowerLine.match(/resource_tags_(aws|user)_([a-z0-9_]+):/);
  if (matchUnderscore && matchUnderscore[2].includes(tagLower)) return true;

  // Match colon-style tags
  const matchColon = lowerLine.match(/resourcetags\/(aws|user):([a-z0-9\-_\/.]+): string \(nullable = true\)/);
  if (matchColon && matchColon[2].includes(tagLower)) return true;

  return false;
});
});

const isSingleTagField = schemaLines.length === 1;
const tagConditionToggleChecked = document.getElementById("tagConditionToggle").checked;
const tagConditionGroupsExist = document.querySelectorAll(".tag-where-group").length > 0;

if (isSingleTagField && tagConditionToggleChecked && tagConditionGroupsExist) {
  const fieldLine = schemaLines[0];
  const tagField = extractFullFieldName(fieldLine);
  if (tagField) {
    alert(`Unable to query Tag conditions for: ${tagField}`);
    return; // Stop further query generation
  }
}

  const tagErrorMsg = document.getElementById("tagErrorMsg");
  tagErrorMsg.style.display = "none";

tagErrorMsg.style.display = "none"; // hide by default

if (schemaLines.length > 1) {
  const matchedValues = tagValues.filter(val =>
    tagFieldLines.some(line => line.toLowerCase().includes(val.toLowerCase()))
  );

  const unmatchedValues = tagValues.filter(val =>
    !matchedValues.includes(val)
  );

  if (unmatchedValues.length === tagValues.length) {
    // full failure
    tagErrorMsg.textContent = "No matching tag values found in the schema";
    tagErrorMsg.style.display = "block";
  } else if (unmatchedValues.length > 0) {
    // partial mismatch
    tagErrorMsg.textContent =
	  "Tag/s not found in the schema: " +
	  unmatchedValues.join(", ");
    tagErrorMsg.style.display = "block";
  }
}
}

if (schemaLines.length === 1 || tagFieldLines.length === 1) {
  const fieldLine = tagFieldLines[0] || schemaLines[0];
  const tagField =
    (schemaLines.length === 1 && tagFieldLines.length === 0)
      ? extractTagPrefix(fieldLine)
      : extractFullFieldName(fieldLine);

  if (tagField) {
    const tagConditions = tagValues.map(val => `\`${tagField}\` ILIKE '%${val}%'`);
    tagClause = `${tagConditions.join(" OR ")}`;

    // Also inject into select/groupBy if needed
    tagSelectLines = [`\`${tagField}\``];
  }
}else if (tagFieldLines.length > 1) {
  tagSelectLines = tagFieldLines.map(line => {
    const field = extractFullFieldName(line);
    return field ? `\`${field}\`` : null;
  }).filter(Boolean);
}

  
  const dimensions = [...selectedDimensions];
  const metrics = [...selectedMetrics];
  const toggle = document.getElementById("whereToggle");
  // 🔍 Build Tag WHERE Clause (structured)
const tagConditionGroups = document.querySelectorAll(".tag-where-group");
let tagConditionClause = "";

if (document.getElementById("tagConditionToggle").checked && tagConditionGroups.length > 0) {
  const tagFieldMap = {}; // tagKey => schemaField

  tagValues.forEach(tag => {
    const matchedLine = schemaLines.find(line => line.toLowerCase().includes(tag.toLowerCase()));
    if (matchedLine) {
      const fieldName = extractFullFieldName(matchedLine);
      if (fieldName) {
        tagFieldMap[tag.toLowerCase()] = fieldName;
      }
    }
  });

const validTagConditions = [];

Array.from(tagConditionGroups).forEach((group) => {
  const rawKey = group.querySelector(".tag-where-key").value.trim();
  const key = rawKey.toLowerCase();
  const schemaField = tagFieldMap[key];

  if (!schemaField) return; // Skip unmatched tag

  const operator = group.querySelector(".tag-where-operator").value;
  const value = group.querySelector(".tag-where-value").value.trim();
  const join = group.querySelector(".tag-join-operator")?.value;

  const isNullCheck = operator === "IS NULL" || operator === "IS NOT NULL";
  if (!operator || (!isNullCheck && !value)) return;

  let condition = "";
  if (isNullCheck) {
    condition = `\`${schemaField}\` ${operator}`;
  } else {
    const formatted = (operator.includes("LIKE")) ? `'%${value}%'` : `'${value}'`;
    condition = `\`${schemaField}\` ${operator} ${formatted}`;
  }

  validTagConditions.push({ condition, join });
});

// ✅ Build the final clause with joins ONLY between valid conditions
tagConditionClause = validTagConditions
  .map((item, idx) => {
    const isLast = idx === validTagConditions.length - 1;
    return isLast ? item.condition : `${item.condition} ${item.join}`;
  })
  .join(" ");
}


//const tagToggleChecked = document.getElementById("enableTags").checked;

if (!tagToggleChecked && dimensions.length === 0 && metrics.length === 0) {
  alert("Please select at least one Dimension or one Metric.");
  return;
}

const dataset = document.getElementById("datasetSelect").value;
//const fileType = document.getElementById("fileTypeSelect")?.value || "Combined";

// CUSTOM OVERRIDE FOR AWS & Amortized Logic
if (
  cloud === 'aws' &&
  selectedMetrics.length === 1 &&
  (
    selectedMetrics[0] === 'Cost(Amortized)' ||
    selectedMetrics[0] === 'Cost (Amortized)'
  )
) {
  let customQuery = "";

const customerValue = document.getElementById("customerInput").value.trim() || "customer";

  if (dataset === "CUR") {
    customQuery = `
results = spark.sql(""" 
  SELECT 
    \`bill/PayerAccountId\`,
    CASE 
        WHEN (\`lineItem/LineItemType\` = 'Fee' AND \`product/ProductName\` = 'AWS Premium Support') THEN 'Support Fee'
        WHEN (\`lineItem/LineItemType\` = 'Usage' AND \`product/ProductName\` = 'AWS Support (Enterprise)') THEN 'Support Fee'
        WHEN (\`lineItem/LineItemType\` = 'Fee' AND \`bill/BillingEntity\` <> 'AWS') THEN 'Marketplace Fee'
        WHEN (\`lineItem/LineItemType\` = 'DiscountedUsage') THEN 'Reservation Applied Usage'
        ELSE \`lineItem/LineItemType\` 
      END \`chargeType\`,
    ROUND(SUM(CASE
        WHEN (\`lineItem/LineItemType\` = 'SavingsPlanCoveredUsage') THEN \`savingsPlan/SavingsPlanEffectiveCost\`
        WHEN (\`lineItem/LineItemType\` = 'SavingsPlanRecurringFee') THEN ROUND((\`savingsPlan/TotalCommitmentToDate\` - \`savingsPlan/UsedCommitment\`),8)
        WHEN (\`lineItem/LineItemType\` = 'SavingsPlanNegation') THEN 0
        WHEN (\`lineItem/LineItemType\` = 'SavingsPlanUpfrontFee') THEN 0
        WHEN (\`lineItem/LineItemType\` = 'DiscountedUsage') THEN \`reservation/EffectiveCost\`
        WHEN (\`lineItem/LineItemType\` = 'RIFee') THEN (\`reservation/UnusedAmortizedUpfrontFeeForBillingPeriod\` + \`reservation/UnusedRecurringFee\`)
        WHEN ((\`lineItem/LineItemType\` = 'Fee') AND (\`reservation/ReservationARN\` <> '')) THEN 0
        ELSE \`lineItem/UnblendedCost\`
    END),2) \`sumAmortizedCost\`
  FROM 
    ${customerValue}\n
  GROUP BY 
    \`bill/PayerAccountId\`, \`chargeType\`
  ORDER BY 
    \`sumAmortizedCost\` DESC
""")

results.display(50, truncate = False)
results.groupBy().sum('sumAmortizedCost').collect()[0][0]`;
  } else if (dataset === "CUR 2.0" || dataset === "Parquet") {
    customQuery = `
results = spark.sql(""" 
  SELECT 
    \`bill_payer_account_id\`,
    CASE 
        WHEN (\`line_item_line_item_type\` = 'Fee' AND \`product_product_name\` = 'AWS Premium Support') THEN 'Support fee'
        WHEN (\`line_item_line_item_type\` = 'Usage' AND \`product_product_name\` = 'AWS Support (Enterprise)') THEN 'Support fee'
        WHEN (\`line_item_line_item_type\` = 'Fee' AND \`bill_billing_entity\` <> 'AWS') THEN 'Marketplace fee'
        WHEN (\`line_item_line_item_type\` = 'DiscountedUsage') THEN 'Reservation applied usage'
        ELSE \`line_item_line_item_type\` 
      END \`charge_type\`,
    ROUND(SUM(CASE
        WHEN (\`line_item_line_item_type\` = 'SavingsPlanCoveredUsage') THEN \`savings_plan_savings_plan_effective_cost\`
        WHEN (\`line_item_line_item_type\` = 'SavingsPlanRecurringFee') THEN ROUND((\`savings_plan_total_commitment_to_date\` - \`savings_plan_used_commitment\`),8)
        WHEN (\`line_item_line_item_type\` = 'SavingsPlanNegation') THEN 0
        WHEN (\`line_item_line_item_type\` = 'SavingsPlanUpfrontFee') THEN 0
        WHEN (\`line_item_line_item_type\` = 'DiscountedUsage') THEN \`reservation_effective_cost\`
        WHEN (\`line_item_line_item_type\` = 'RIFee') THEN (\`reservation_unused_amortized_upfront_fee_for_billing_period\` + \`reservation_unused_recurring_fee\`)
        WHEN ((\`line_item_line_item_type\` = 'Fee') AND (\`reservation_reservation_a_r_n\` <> '')) THEN 0
        ELSE \`line_item_unblended_cost\`
    END),2) \`sum_amortized_cost\`
  FROM 
    ${customerValue}\n
  GROUP BY 
    \`bill_payer_account_id\`, \`charge_type\`
  ORDER BY 
    \`sum_amortized_cost\` DESC
""")

results.display(50, truncate = False)
results.groupBy().sum('sumAmortizedCost').collect()[0][0]`;
  }


  
const createBtn = document.getElementById("createQuery");
const spinner = document.getElementById("queryLoading");

// Show spinner
spinner.classList.remove("hidden");

// Delay showing the query
setTimeout(() => {
  // Show final output
  document.getElementById("output").textContent = customQuery;
  document.getElementById("outputContainer").classList.remove("hidden");
  hljs.highlightElement(document.getElementById("output"));

  // Hide spinner
  spinner.classList.add("hidden");
}, 1000);
  return;
}
// Build mapped dimensions
const mappedDimensionsRaw = dimensions.map(dim => {
  const map = dimensionMappings[cloudKey][dataset] || {};
  const field = map[dim] || dim;

  if (dim === "Date") {
    // ✅ Only Date gets wrapped in date()
    return `date(\`${field}\`)`;
  }

  // For all other fields, return with backticks once
  return `\`${field}\``;
});

// Now use as-is without wrapping again
const selectDims = mappedDimensionsRaw;

// Deduplicate mapped dimension values
const mappedDimensions = [...new Set(mappedDimensionsRaw)];

const fileType = document.getElementById("fileTypeSelect")?.value || "Combined";
const metricMap = metricMappings[cloudKey];

const mappedMetrics = metrics.map(met => {
  if (cloudKey === "Azure") {
    if (dataset === "Azure_EA") {
      return metricMappings.Azure.Azure_EA?.[met] || met;
    }

    if (dataset === "Azure_UD") {
      return metricMappings.Azure.Azure_UD?.[fileType]?.[met] || met;
    }

    // Fallback for other cases
    return metricMappings.Azure.Combined?.[met] || met;
  }

  return metricMappings[cloudKey]?.[met] || met;
});


console.log("Cloud:", cloudKey);
console.log("Dataset:", dataset);
console.log("FileType:", fileType);
console.log("Metrics Selected:", metrics);
console.log("Mapped Metrics:", mappedMetrics);


  //const selectDims = mappedDimensions.map(d => `\`${d}\``);
  const metricAliases = {
  'Cost(Total)': 'Cost_Total',
  'Cost (Total)': 'Cost_Total',
  'Cost(Amortized)': 'Cost_Amortized'
};

const selectMets = metrics.map((m, i) => {
  const mapped = mappedMetrics[i];
  const alias = metricAliases[m] || m;
  return `sum(\`${mapped}\`) AS ${alias}`;
});

// ✅ Inject tagSelectLines into SELECT
const selectClause = `    SELECT DISTINCT ${[...selectDims, ...tagSelectLines, ...selectMets].join(", ")}`;
// WHERE
let whereClause = "";
if (toggle.checked) {
  const whereGroups = document.querySelectorAll(".where-group");

  const conditions = [];
  let orGroup = [];

  Array.from(whereGroups).forEach((group, index) => {
    const fieldLabel = group.querySelector(".where-dimension").value;
    const dataset = document.getElementById("datasetSelect").value;
    const fieldMap = dimensionMappings[cloudKey][dataset] || {};
    const field = fieldMap[fieldLabel] || fieldLabel;
    const operator = group.querySelector(".where-operator").value;
    const valueInput = group.querySelector(".where-value");
    const value = valueInput.value.trim();
    const join = group.querySelector(".join-operator")?.value || "AND";

    // 🛑 Validation
    const isNullCheck = operator === "IS NULL" || operator === "IS NOT NULL";
    if (!field || !operator || (!isNullCheck && value === "")) {
      alert("Incomplete WHERE condition. Please fill all fields or remove the condition.");
      throw new Error("Invalid WHERE condition");
    }

    // Build condition
let condition = "";
if (isNullCheck) {
  if (fieldLabel === "Date") {
    condition = `date(\`${field}\`) ${operator}`;
  } else {
    condition = `\`${field}\` ${operator}`;
  }
} else {
  const formattedValue = (operator === "LIKE" || operator === "NOT LIKE") 
    ? `'%${value}%'` 
    : `'${value}'`;

  if (fieldLabel === "Date") {
    // ✅ Wrap Date fields in date()
    condition = `date(\`${field}\`) ${operator} ${formattedValue}`;
  } else {
    condition = `\`${field}\` ${operator} ${formattedValue}`;
  }
}

    if (join === "OR") {
      // keep adding to OR group
      orGroup.push(condition);
    } else {
      // if we have an active OR group, close it before adding this AND condition
      if (orGroup.length > 0) {
        orGroup.push(condition); // add the last condition before closing
        conditions.push(`(${orGroup.join(" OR ")})`);
        orGroup = [];
      } else {
        conditions.push(condition);
      }
    }

    // End of loop: flush any open OR group
    if (index === whereGroups.length - 1 && orGroup.length > 0) {
      conditions.push(`(${orGroup.join(" OR ")})`);
    }
  });

  if (conditions.length > 0) {
    whereClause = `    WHERE ${conditions.join(" AND ")}\n`;
  }
}
  // GROUP BY & ORDER BY
  let orderClause = "";
  let groupClause = "";
	if (mappedDimensions.length > 0) {
	groupClause = `    GROUP BY ${mappedDimensions.join(", ")}\n`;
} 
//const selectedOrder = document.getElementById("customOrderField")?.value || "None";
let selectedOrder = document.getElementById("customOrderField")?.value;
if (!selectedOrder) selectedOrder = "None";
const orderDirection = document.querySelector('input[name="orderDirection"]:checked')?.value || "ASC";
//const orderDirection = orderDirectionToggle && orderDirectionToggle.checked ? "DESC" : "ASC";
const isMetricSelectedForOrder = selectedMetrics.includes(selectedOrder);

// 👇 Build GROUP BY only if dimensions or tags + metrics
if ((dimensions.length > 0 || tagSelectLines.length > 0) && metrics.length > 0) {
  // mappedDimensions are already correctly formatted
  // tagSelectLines need wrapping safely (they are raw names without backticks after .replace())
  const tagFields = tagSelectLines.map(f => `\`${f.replace(/[`]/g, '')}\``);

  const allGroupFields = [...mappedDimensions, ...tagFields];
  groupClause = `    GROUP BY ${allGroupFields.join(", ")}\n`;
}
// 🧠 Build ORDER BY (if dropdown is not "None" OR if metrics exist)
let orderParts = [];
if (selectedOrder !== "None") {
  if (isMetricSelectedForOrder) {
    const alias = metricAliases[selectedOrder] || selectedOrder;
    orderParts.push(`${alias} ${orderDirection}`); // Metrics never get backticks
  } else {
    const orderFieldMap = {
      ...dimensionMappings[cloudKey]?.[dataset],
      ...metricAliases
    };
    const mapped = orderFieldMap[selectedOrder] || selectedOrder;

    if (selectedOrder === "Date") {
      // ✅ Apply date() for Date dimension
      orderParts.push(`date(\`${mapped}\`) ${orderDirection}`);
    } else {
      // ✅ Wrap once in backticks for other dimensions
      orderParts.push(`\`${mapped}\` ${orderDirection}`);
    }
  }
}
// Append other metrics (if any) except the first selected one
if (metrics.length > 0) {
  const remainingMetrics = selectedMetrics.filter(m => m !== selectedOrder);
  orderParts.push(...remainingMetrics.map(m => `${metricAliases[m] || m}`));
}

// Only create ORDER BY clause if any part was added
if (orderParts.length > 0) {
  orderClause = `    ORDER BY ${orderParts.join(", ")}\n`;
}

let whereCombined = "";
const isSingleTagLine = schemaLines.length === 1;

if (whereClause.trim() && isSingleTagLine && tagClause) {
  whereCombined = `    ${whereClause.trim()}\n    AND ${tagClause}\n`;
} else if (isSingleTagLine && tagClause) {
  whereCombined = `    WHERE ${tagClause}\n`;
} else {
  whereCombined = whereClause;
if (tagConditionClause) {
  whereCombined = whereCombined
    ? `    ${whereCombined.trim()}` + `\n    AND ${tagConditionClause}\n`
    : `    WHERE ${tagConditionClause}\n`;
}
}


// Inject tagClause into query
//let whereCombined = whereClause + tagClause;
const customerValue = document.getElementById("customerInput").value.trim() || "customer";

const query = `results = spark.sql("""\n` +
  `${selectClause}\n` +
  `    FROM ${customerValue}\n` +
  `${whereCombined}` +
  `${groupClause}` +
  `${orderClause}` +
  `""")\n` +
  `display(results)`;

const createBtn = document.getElementById("createQuery");
const spinner = document.getElementById("queryLoading");

// Show spinner
spinner.classList.remove("hidden");

// Delay showing the query
setTimeout(() => {
  // Generate the query string (your existing logic should remain as-is)
  document.getElementById("output").textContent = query;
  document.getElementById("outputContainer").classList.remove("hidden");
  hljs.highlightElement(document.getElementById("output"));

  // Hide spinner
  spinner.classList.add("hidden");
}, 1000);

});


const copyBtn = document.getElementById("copyBtn");
const copyMsg = document.getElementById("copyMsg");

copyBtn.addEventListener("click", () => {
  const queryText = document.getElementById("output").textContent;
  navigator.clipboard.writeText(queryText).then(() => {
    // Change button text to "Copied"
    const originalText = copyBtn.textContent;
    copyBtn.textContent = "✅ Copied";

    // Optional: show the floating message too
    copyMsg.classList.remove("hidden");

    // Revert button text and hide message after 1.5s
    setTimeout(() => {
      copyBtn.textContent = originalText;
      copyMsg.classList.add("hidden");
    }, 1500);
  });
});

const tagToggle = document.getElementById("enableTags");
tagToggle.addEventListener("change", (e) => {
  const tagSection = document.querySelector(".tag-section");
  const schemaSection = document.querySelector(".schema-section");
  const tagContainer = document.getElementById("tagInputs");
  const schemaInput = document.getElementById("schemaInput");
  const tagErrorMsg = document.getElementById("tagErrorMsg");

  const tagConditionToggle = document.getElementById("tagConditionToggle");
  const tagConditionContainer = document.getElementById("tagConditionContainer");
  const tagConditionInputs = document.getElementById("tagConditionInputs");

  const show = e.target.checked;

  // Show/hide Tag section
  tagSection.style.display = show ? "block" : "none";
  schemaSection.style.display = show ? "block" : "none";

  if (!show) {
    // Reset Tag fields
    tagContainer.innerHTML = "";
    const wrapper = document.createElement("div");
    wrapper.className = "tag-field-wrapper";
    wrapper.style.display = "flex";
    wrapper.style.alignItems = "center";
    wrapper.style.gap = "0.5rem";

    const input = document.createElement("input");
    input.type = "text";
    input.className = "tag-input";
    input.placeholder = "Enter Tag Key";

    wrapper.appendChild(input);
    tagContainer.appendChild(wrapper);

    schemaInput.value = "";
    tagErrorMsg.style.display = "none";

    // Also reset Tag Condition
    tagConditionToggle.checked = false;
    tagConditionContainer.classList.add("hidden");
    tagConditionInputs.innerHTML = "";
  }
});


//Absolute fallback (event delegation)
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.remove-tag');
  if (btn) {
    const val = btn.dataset.value;
    const type = btn.dataset.type;
    const list = type === 'dimension' ? selectedDimensions : selectedMetrics;

    const index = list.indexOf(val);
    if (index > -1) list.splice(index, 1);

    const selector = `.${type}-option[value="${val}"]`;
    const checkbox = document.querySelector(selector);
    if (checkbox) checkbox.checked = false;

    updateSelectionPreview();
  }
});

const tagConditionToggle = document.getElementById("tagConditionToggle");
const tagConditionContainer = document.getElementById("tagConditionContainer");
const tagConditionInputs = document.getElementById("tagConditionInputs");
const addTagConditionBtn = document.getElementById("addTagCondition");

tagConditionToggle.addEventListener("change", () => {
  const container = document.getElementById("tagConditionContainer");
  const inputs = document.getElementById("tagConditionInputs");

  if (tagConditionToggle.checked) {
    container.classList.remove("hidden");
  } else {
    container.classList.add("hidden");
    inputs.innerHTML = ""; // reset all conditions
  }
});


addTagConditionBtn.addEventListener("click", () => {
  const tagKeys = [...document.querySelectorAll(".tag-input")]
    .map(input => input.value.trim())
    .filter(Boolean);

  if (tagKeys.length === 0) {
    alert("Enter at least one Tag Key to add tag conditions.");
    return;
  }

  const group = document.createElement("div");
  group.className = "tag-where-group";
  group.style.display = "flex";
  group.style.gap = "0.5rem";
  group.style.alignItems = "center";
  group.style.marginBottom = "0.5rem";

  group.innerHTML = `
    <select class="tag-where-key">
      ${tagKeys.map(key => `<option value="${key}">${key}</option>`).join("")}
    </select>

    <select class="tag-where-operator">
      <option value="=">Equals</option>
      <option value="!=">Not Equals</option>
      <option value="LIKE">Contains</option>
      <option value="NOT LIKE">Does Not Contain</option>
      <option value="IS NULL">Is Null</option>
      <option value="IS NOT NULL">Is Not Null</option>
    </select>

    <input type="text" class="tag-where-value" placeholder="Value (optional)" />

    <select class="tag-join-operator">
      <option value="AND">AND</option>
      <option value="OR">OR</option>
    </select>

    <button class="remove-btn">x</button>
  `;

  const operatorSelect = group.querySelector(".tag-where-operator");
  const valueInput = group.querySelector(".tag-where-value");

  operatorSelect.addEventListener("change", () => {
    const op = operatorSelect.value;
    valueInput.disabled = (op === "IS NULL" || op === "IS NOT NULL");
  });

  group.querySelector(".remove-btn").addEventListener("click", () => {
    group.remove();
    updateTagJoinVisibility();
  });

  tagConditionInputs.appendChild(group);
  updateTagJoinVisibility();
});

const label = document.getElementById("orderDirectionLabel");

function updateTagJoinVisibility() {
  const groups = document.querySelectorAll(".tag-where-group");
  groups.forEach((group, idx) => {
    const join = group.querySelector(".tag-join-operator");
    if (!join) return;
    join.style.display = (idx === groups.length - 1) ? "none" : "inline-block";
    join.disabled = (idx === groups.length - 1);
  });
}

}

window.addEventListener('click', function (e) {
  if (!e.target.closest('.dropdown')) {
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
      menu.style.display = 'none';
    });
  }
});

// Dropdown toggle handler
function toggleDropdown(id) {
  document.querySelectorAll('.dropdown-menu').forEach(menu => {
    if (menu.id === id) {
      menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
    } else {
      menu.style.display = 'none';
    }
  });
}

// Checkbox limit enforcement
function handleLimit(checkbox, className, max) {
  const type = className.includes("dimension") ? "dimension" : "metric";
  const list = type === "dimension" ? selectedDimensions : selectedMetrics;

  console.log(`[${type.toUpperCase()}]`, checkbox.value, checkbox.checked); 

  if (checkbox.checked) {
    if (list.length >= max) {
      checkbox.checked = false;
      alert(`You can only select up to ${max} ${type}s.`);
      return;
    }
    list.push(checkbox.value);
  } else {
    const index = list.indexOf(checkbox.value);
    if (index > -1) list.splice(index, 1);
  }

  updateSelectionPreview();
  updateOrderByDropdown();
}

function handleAmortizedEffect() {
  if (window.currentCloud !== 'aws') return; // Skip if not AWS

  const dimensionSection = document.getElementById("dimensionDropdown");
  const whereToggle = document.getElementById("whereToggle");
  const whereContainer = document.getElementById("whereContainer");
  const enableTags = document.getElementById("enableTags");

  // Reset all checkboxes to enabled
  document.querySelectorAll(".dimension-option").forEach(input => input.disabled = false);
  document.querySelectorAll(".metric-option").forEach(input => input.disabled = false);
  dimensionSection.classList.remove("disabled");
  whereToggle.disabled = false;
  enableTags.disabled = false;

  const amortizedSelected = selectedMetrics.includes("Cost(Amortized)");

  if (amortizedSelected) {
    // ✅ Clear all dimensions
    selectedDimensions = [];
    document.querySelectorAll(".dimension-option").forEach(input => input.checked = false);

    // ✅ Remove Cost(Total) from selectedMetrics and uncheck it
    selectedMetrics = selectedMetrics.filter(metric => {
      if (metric === "Cost(Total)" || metric === "Cost (Total)") {
        const checkbox = document.querySelector(`.metric-option[value="${metric}"]`);
        if (checkbox) checkbox.checked = false;
        return false; // remove it
      }
      return true;
    });

    // ✅ Disable "Cost(Total)" checkboxes
    document.querySelectorAll('.metric-option').forEach(input => {
      if (input.value === "Cost(Total)" || input.value === "Cost (Total)") {
        input.disabled = true;
      }
    });

    // Disable dimensions and where clause
    dimensionSection.classList.add("disabled");
    whereToggle.disabled = true;
	enableTags.disabled = true;
    whereContainer.classList.add("hidden");
  }

  // Update UI previews
  renderTags("dimensionPreview", selectedDimensions, "dimension");
  renderTags("metricPreview", selectedMetrics, "metric");
}


function updateSelectionPreview() {
  renderTags("dimensionPreview", selectedDimensions, "dimension");
  renderTags("metricPreview", selectedMetrics, "metric");

  // 🔁 NEW: Check if Amortized is still selected and apply effect
  handleAmortizedEffect();
  updateOrderByDropdown();

}
  
function updateOrderByDropdown() {
  const dropdown = document.getElementById("customOrderField");
  if (!dropdown) return;

  const options = [...selectedDimensions, ...selectedMetrics];

  // Preserve the "Sort By" placeholder
  dropdown.innerHTML = `<option value="" disabled selected hidden>Sort By</option>` +
    options.map(opt => `<option value="${opt}">${opt}</option>`).join('');
}

function renderTags(containerId, list, type) {
  const container = document.getElementById(containerId);
container.innerHTML = list.map((val, i) =>
  `<span class="tag" data-type="${type}" data-index="${i}">
    ${val}
    ${i > 0 ? `<button class="move-up" data-type="${type}" data-index="${i}"><i class="fas fa-chevron-up"></i></button>` : ''}
    ${i < list.length - 1 ? `<button class="move-down" data-type="${type}" data-index="${i}"><i class="fas fa-chevron-down"></i></button>` : ''}
    <button class="remove-tag" data-type="${type}" data-value="${val}"><i class="fas fa-times"></i></button>
  </span>`
).join('');

// Move up/down functionality
container.querySelectorAll('.move-up').forEach(btn => {
  btn.addEventListener('click', () => {
    const index = parseInt(btn.dataset.index);
    const type = btn.dataset.type;
    const list = type === 'dimension' ? selectedDimensions : selectedMetrics;
    if (index > 0) {
      [list[index - 1], list[index]] = [list[index], list[index - 1]];
      updateSelectionPreview();
    }
  });
});

container.querySelectorAll('.move-down').forEach(btn => {
  btn.addEventListener('click', () => {
    const index = parseInt(btn.dataset.index);
    const type = btn.dataset.type;
    const list = type === 'dimension' ? selectedDimensions : selectedMetrics;
    if (index < list.length - 1) {
      [list[index], list[index + 1]] = [list[index + 1], list[index]];
      updateSelectionPreview();
    }
  });
});

  // Enable removal
container.querySelectorAll('.remove-tag').forEach(btn => {
  btn.addEventListener('click', () => {
    const val = btn.dataset.value; // moved here
    console.log("❌ Remove clicked:", val);
    const type = btn.dataset.type;
    const list = type === 'dimension' ? selectedDimensions : selectedMetrics;

    const index = list.indexOf(val);
    if (index > -1) list.splice(index, 1);

    const selector = `.${type}-option[value="${val}"]`;
    const checkbox = document.querySelector(selector);
    if (checkbox) checkbox.checked = false;

    updateSelectionPreview();
  });
});
}


function updateArrayFromTags(containerId, targetArray) {
  const tags = [...document.querySelectorAll(`#${containerId} .tag`)];
  targetArray.length = 0;

  tags.forEach(tag => {
    // Get text node directly before the buttons
    const textNode = Array.from(tag.childNodes).find(n => n.nodeType === Node.TEXT_NODE);
    if (textNode) {
      targetArray.push(textNode.textContent.trim());
    }
  });

}




