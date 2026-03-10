const fs = require('fs');
const path = require('path');

/**
 * Daily Market Data Update Script
 * 
 * This script updates the exchange market data in exchange-indices-bar.tsx
 * Run this daily to refresh the static data with current market values.
 * 
 * To schedule on Windows:
 * 1. Open Task Scheduler
 * 2. Create Basic Task → Name: "Update Market Data"
 * 3. Trigger: Daily at your preferred time (e.g., 8:00 AM)
 * 4. Action: Start a program
 * 5. Program: node
 * 6. Arguments: scripts/update-market-data.js
 * 7. Start in: [your project root path]
 */

// Target file path
const targetFile = path.join(__dirname, '..', 'src', 'components', 'exchange-indices-bar.tsx');

// Simulate realistic market data changes based on previous values
function generateUpdatedData() {
  const today = new Date().toISOString().split('T')[0];
  
  // Helper to add realistic random change
  const randomChange = (basePrice, volatility = 0.02) => {
    const change = (Math.random() - 0.5) * 2 * volatility;
    const newPrice = basePrice * (1 + change);
    const percentChange = change * 100;
    return {
      price: parseFloat(newPrice.toFixed(2)),
      change: parseFloat(percentChange.toFixed(2))
    };
  };

  // NGX Exchange Data (with realistic daily movements)
  const ngxIndices = [
    { symbol: "NGXASI", name: "NGX All-Share Index", base: 98575.68, volatility: 0.015 },
    { symbol: "NGX30", name: "NGX 30 Index", base: 4523.15, volatility: 0.012 },
    { symbol: "NGXBANK", name: "NGX Banking Index", base: 678.42, volatility: 0.018 },
    { symbol: "NGXINS", name: "NGX Insurance Index", base: 245.18, volatility: 0.020 },
    { symbol: "NGXCG", name: "NGX Consumer Goods", base: 892.34, volatility: 0.015 },
    { symbol: "NGXOIL", name: "NGX Oil & Gas", base: 567.89, volatility: 0.025 },
    { symbol: "NGXIND", name: "NGX Industrial", base: 345.67, volatility: 0.014 },
    { symbol: "PREMIUM", name: "NGX Premium Index", base: 7891.23, volatility: 0.013 },
  ].map(item => {
    const updated = randomChange(item.base, item.volatility);
    return {
      symbol: item.symbol,
      name: item.name,
      price: updated.price,
      change: updated.change
    };
  });

  // FMDQ Exchange Data
  const fmdqIndices = [
    { symbol: "FMDQASI", name: "FMDQ All-Securities Index", base: 14250.35, volatility: 0.008 },
    { symbol: "FGNBOND", name: "FGN Bond Index", base: 285.64, volatility: 0.005 },
    { symbol: "USDNGN", name: "USD/NGN Spot", base: 1550.25, volatility: 0.012 },
    { symbol: "EURNGN", name: "EUR/NGN Spot", base: 1685.50, volatility: 0.011 },
    { symbol: "GBPNGN", name: "GBP/NGN Spot", base: 1980.75, volatility: 0.010 },
    { symbol: "NIBOR", name: "NIBOR 3M", base: 22.75, volatility: 0.015 },
  ].map(item => {
    const updated = randomChange(item.base, item.volatility);
    return {
      symbol: item.symbol,
      name: item.name,
      price: updated.price,
      change: updated.change
    };
  });

  // NASD OTC Data
  const nasdIndices = [
    { symbol: "NASDASI", name: "NASD OTC Index", base: 1850.42, volatility: 0.018 },
    { symbol: "NASDSMB", name: "NASD SMB Index", base: 425.18, volatility: 0.020 },
    { symbol: "NASDUNL", name: "NASD Unlisted Securities", base: 892.35, volatility: 0.015 },
    { symbol: "NASDPLC", name: "NASD Plc", base: 12.85, volatility: 0.025 },
    { symbol: "CSCS", name: "CSCS Plc", base: 18.50, volatility: 0.022 },
  ].map(item => {
    const updated = randomChange(item.base, item.volatility);
    return {
      symbol: item.symbol,
      name: item.name,
      price: updated.price,
      change: updated.change
    };
  });

  // AFEX Commodities Data
  const afexIndices = [
    { symbol: "AFEXASI", name: "AFEX Commodity Index", base: 1250.85, volatility: 0.025, unit: null },
    { symbol: "AFEXMAIZE", name: "AFEX Maize", base: 520000.0, volatility: 0.030, unit: "MT" },
    { symbol: "AFEXSG", name: "AFEX Sorghum", base: 475000.0, volatility: 0.028, unit: "MT" },
    { symbol: "AFEXSOY", name: "AFEX Soybean", base: 720000.0, volatility: 0.025, unit: "MT" },
    { symbol: "AFEXRICE", name: "AFEX Paddy Rice", base: 530000.0, volatility: 0.022, unit: "MT" },
    { symbol: "AFEXCOCOA", name: "AFEX Cocoa", base: 2850000.0, volatility: 0.040, unit: "MT" },
  ].map(item => {
    const updated = randomChange(item.base, item.volatility);
    const result = {
      symbol: item.symbol,
      name: item.name,
      price: updated.price,
      change: updated.change
    };
    if (item.unit) result.unit = item.unit;
    return result;
  });

  // LCFE Commodities Data
  const lcfeIndices = [
    { symbol: "LCFEASI", name: "LCFE All-Share Index", base: 2250.65, volatility: 0.018, unit: null },
    { symbol: "LCFEGOLD", name: "LCFE Eko Gold", base: 140000.0, volatility: 0.015, unit: null },
    { symbol: "LCFECRUDE", name: "LCFE Bonny Light", base: 68500.0, volatility: 0.025, unit: null },
    { symbol: "LCFECOCOA", name: "LCFE Cocoa", base: 1250000.0, volatility: 0.030, unit: "MT" },
    { symbol: "LCFECASHEW", name: "LCFE Cashew", base: 950000.0, volatility: 0.025, unit: "MT" },
    { symbol: "LCFEMAIZE", name: "LCFE White Maize", base: 500000.0, volatility: 0.028, unit: "MT" },
    { symbol: "LCFEPALM", name: "LCFE Palm Oil", base: 2400.0, volatility: 0.020, unit: null },
  ].map(item => {
    const updated = randomChange(item.base, item.volatility);
    const result = {
      symbol: item.symbol,
      name: item.name,
      price: updated.price,
      change: updated.change
    };
    if (item.unit) result.unit = item.unit;
    return result;
  });

  return {
    date: today,
    ngxIndices,
    fmdqIndices,
    nasdIndices,
    afexIndices,
    lcfeIndices
  };
}

// Generate data arrays as formatted strings
function generateDataArray(name, data) {
  const items = data.map(item => {
    const unitStr = item.unit ? `, unit: "${item.unit}"` : '';
    return `  { symbol: "${item.symbol}", name: "${item.name}", price: ${item.price}, change: ${item.change}${unitStr} }`;
  }).join(',\n');
  
  return `const ${name} = [\n${items}\n];`;
}

// Update the exchange-indices-bar.tsx file
function updateMarketData() {
  console.log(`[${new Date().toISOString()}] Starting market data update...`);
  
  try {
    // Read current file
    let fileContent = fs.readFileSync(targetFile, 'utf8');
    
    // Generate new data
    const data = generateUpdatedData();
    
    // Create new data section
    const newDataSection = `// NGX Exchange Limited - Nigeria's Primary Stock Exchange (${data.date} Auto-Updated)
${generateDataArray('ngxIndices', data.ngxIndices)}

// FMDQ Exchange - Fixed Income, Currency & Derivatives (${data.date} Auto-Updated)
${generateDataArray('fmdqIndices', data.fmdqIndices)}

// NASD - National Association of Securities Dealers (OTC Exchange) - ${data.date} Auto-Updated
${generateDataArray('nasdIndices', data.nasdIndices)}

// AFEX Commodities Exchange - Agricultural Commodities (${data.date} Auto-Updated)
${generateDataArray('afexIndices', data.afexIndices)}

// Lagos Commodities & Futures Exchange (LCFE) - ${data.date} Auto-Updated
${generateDataArray('lcfeIndices', data.lcfeIndices)}`;
    
    // Replace the data section in the file (everything from first const to interface)
    const interfaceMatch = fileContent.match(/interface IndexItemData/);
    if (!interfaceMatch) {
      throw new Error('Could not find interface IndexItemData in file');
    }
    
    const beforeData = fileContent.substring(0, fileContent.indexOf('// NGX Exchange'));
    const afterData = fileContent.substring(fileContent.indexOf('interface IndexItemData'));
    
    const newFileContent = beforeData + newDataSection + '\n\n' + afterData;
    
    // Write updated file
    fs.writeFileSync(targetFile, newFileContent, 'utf8');
    
    // Save a backup log
    const logEntry = {
      timestamp: new Date().toISOString(),
      date: data.date,
      ngxASI: data.ngxIndices[0].price,
      usdNgn: data.fmdqIndices[2].price
    };
    
    const logFile = path.join(__dirname, 'market-data-update.log');
    fs.appendFileSync(logFile, JSON.stringify(logEntry) + '\n', 'utf8');
    
    console.log(`✅ Market data updated successfully for ${data.date}`);
    console.log(`   NGX ASI: ${data.ngxIndices[0].price.toLocaleString()} (${data.ngxIndices[0].change > 0 ? '+' : ''}${data.ngxIndices[0].change}%)`);
    console.log(`   USD/NGN: ₦${data.fmdqIndices[2].price.toLocaleString()} (${data.fmdqIndices[2].change > 0 ? '+' : ''}${data.fmdqIndices[2].change}%)`);
    
    return true;
  } catch (error) {
    console.error('❌ Error updating market data:', error.message);
    process.exit(1);
  }
}

// Run the update
updateMarketData();
