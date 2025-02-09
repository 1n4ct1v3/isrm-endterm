import React, { useState, useEffect } from 'react';
import { PlusCircle, XCircle, Calculator, AlertTriangle } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface RiskRow {
  id: string;
  situation: string;
  loss: number;
  probability: number;
}

function CalculatorPage() {
  const [rows, setRows] = useState<RiskRow[]>([
    { id: uuidv4(), situation: '', loss: 0, probability: 0 }
  ]);
  const [calculations, setCalculations] = useState({
    averageLoss: 0,
    variance: 0,
    rmsLoss: 0,
    integralRisk: 0
  });
  const [updatedCalculations, setUpdatedCalculations] = useState({
    averageLoss: 0,
    variance: 0,
    rmsLoss: 0,
    integralRisk: 0
  });
  const [valueSpec, setValueSpec] = useState(0.3);

  const addRow = () => {
    setRows(prevRows => [...prevRows, {
      id: uuidv4(),
      situation: '',
      loss: 0,
      probability: 0
    }]);
  };

  const removeRow = (id: string) => {
    setRows(prevRows => prevRows.filter(row => row.id !== id));
  };

  const updateRow = (id: string, field: keyof RiskRow, value: string | number) => {
    setRows(prevRows => prevRows.map(row => {
      if (row.id === id) {
        return { ...row, [field]: value };
      }
      return row;
    }));
  };

  // Calculate base calculations
  useEffect(() => {
    let avgLoss = rows.reduce((acc, row) => acc + (row.loss * row.probability), 0);
    let variance = rows.reduce((acc, row) => {
      return acc + Math.pow(row.loss - avgLoss, 2) * row.probability;
    }, 0);

    const rmsLoss = Math.sqrt(variance);
    const integralRisk = (valueSpec * avgLoss) + ((1 - valueSpec) * rmsLoss);

    setCalculations({
      averageLoss: avgLoss,
      variance,
      rmsLoss,
      integralRisk
    });
  }, [rows, valueSpec]);

  // Calculate updated calculations
  useEffect(() => {
    const calculateUpdatedValues = () => {
      let avgLoss = 0;
      let variance = 0;

      // Calculate average loss with updated conditions
      avgLoss = rows.reduce((acc, row) => {
        const updatedLoss = row.loss + 100;
        const updatedProbability = 
          row.situation.includes("personal") || row.situation.includes("data") 
            ? row.probability / 10 
            : row.probability;
        return acc + (updatedLoss * updatedProbability);
      }, 0);

      // Calculate variance with updated conditions
      variance = rows.reduce((acc, row) => {
        const updatedLoss = row.loss + 100;
        const updatedProbability = 
          row.situation.includes("personal") || row.situation.includes("data") 
            ? row.probability / 10 
            : row.probability;
        return acc + Math.pow(updatedLoss - avgLoss, 2) * updatedProbability;
      }, 0);

      const rmsLoss = Math.sqrt(variance);
      const integralRisk = (valueSpec * avgLoss) + ((1 - valueSpec) * rmsLoss);

      return {
        averageLoss: avgLoss,
        variance,
        rmsLoss,
        integralRisk
      };
    };

    setUpdatedCalculations(calculateUpdatedValues());
  }, [rows, valueSpec]);

  // Handle "everything will be fine" probability updates
  useEffect(() => {
    const shouldUpdateProbability = rows.some(row => 
      row.situation.includes("everything will be fine")
    );

    if (shouldUpdateProbability) {
      const newProbability = rows
        .filter(row => !row.situation.includes("everything will be fine"))
        .reduce((acc, row) => {
          const probReduction = row.situation.includes("personal") || row.situation.includes("data")
            ? row.probability / 10
            : row.probability;
          return acc - probReduction;
        }, 1);

      setRows(prevRows => prevRows.map(row => {
        if (row.situation.includes("everything will be fine")) {
          return { ...row, probability: Math.max(0, newProbability) };
        }
        return row;
      }));
    }
  }, [rows]);

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-8">
            <Calculator className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-800">Integral Risk Calculator</h1>
          </div>

          {/* E Value Input Field */}
          <div className="mb-6">
            <label className="text-sm font-medium text-gray-700">E Value:</label>
            <input
              type="number"
              min="0"
              max="1"
              step="0.01"
              value={valueSpec}
              onChange={(e) => setValueSpec(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full mb-6">
              <thead>
                <tr className="bg-indigo-50">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 rounded-l-lg">Possible Situations</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Losses (thousand tenge)</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Probability (per year)</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 rounded-r-lg w-20">Action</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors"
                        value={row.situation}
                        onChange={(e) => updateRow(row.id, 'situation', e.target.value)}
                        placeholder="Enter situation"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        min="0"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors"
                        value={row.loss || ''}
                        onChange={(e) => updateRow(row.id, 'loss', parseFloat(e.target.value) || 0)}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors"
                        value={row.probability || ''}
                        onChange={(e) => updateRow(row.id, 'probability', parseFloat(e.target.value) || 0)}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => removeRow(row.id)}
                        className="p-2 text-red-500 hover:text-red-700 transition-colors"
                        disabled={rows.length === 1}
                      >
                        <XCircle className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            onClick={addRow}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors mb-8"
          >
            <PlusCircle className="w-5 h-5" />
            Add More
          </button>

          <div className="grid md:grid-cols-2 gap-6 bg-indigo-50 rounded-xl p-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm">
                <AlertTriangle className="w-5 h-5 text-indigo-600 mt-1" />
                <div>
                  <h3 className="text-sm font-medium text-gray-600">Average losses from risk</h3>
                  <p className="text-xl font-semibold text-gray-900">{calculations.averageLoss.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm">
                <AlertTriangle className="w-5 h-5 text-indigo-600 mt-1" />
                <div>
                  <h3 className="text-sm font-medium text-gray-600">Variance of the result</h3>
                  <p className="text-xl font-semibold text-gray-900">{calculations.variance.toFixed(2)}</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm">
                <AlertTriangle className="w-5 h-5 text-indigo-600 mt-1" />
                <div>
                  <h3 className="text-sm font-medium text-gray-600">RMS Loss</h3>
                  <p className="text-xl font-semibold text-gray-900">{calculations.rmsLoss.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm">
                <AlertTriangle className="w-5 h-5 text-indigo-600 mt-1" />
                <div>
                  <h3 className="text-sm font-medium text-gray-600">Integral Risk</h3>
                  <p className="text-xl font-semibold text-gray-900">{calculations.integralRisk.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* New feature starts here */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Updated Risk Assessment with Data Protection System</h2>
            <div className="overflow-x-auto">
              <table className="w-full mb-6">
                <thead>
                  <tr className="bg-indigo-50">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 rounded-l-lg">Possible Situations</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Losses (thousand tenge)</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Probability (per year)</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">{row.situation}</td>
                      <td className="px-4 py-3">{(row.loss + 100).toFixed(2)}</td>
                      <td className="px-4 py-3">{(row.situation.includes("personal") || row.situation.includes("data") ? (row.probability / 10).toFixed(4) : row.probability.toFixed(4))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="grid md:grid-cols-2 gap-6 bg-indigo-50 rounded-xl p-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm">
                  <AlertTriangle className="w-5 h-5 text-indigo-600 mt-1" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-600">Average losses from risk</h3>
                    <p className="text-xl font-semibold text-gray-900">{updatedCalculations.averageLoss.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm">
                  <AlertTriangle className="w-5 h-5 text-indigo-600 mt-1" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-600">Variance of the result</h3>
                    <p className="text-xl font-semibold text-gray-900">{updatedCalculations.variance.toFixed(2)}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm">
                  <AlertTriangle className="w-5 h-5 text-indigo-600 mt-1" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-600">RMS Loss</h3>
                    <p className="text-xl font-semibold text-gray-900">{updatedCalculations.rmsLoss.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm">
                  <AlertTriangle className="w-5 h-5 text-indigo-600 mt-1" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-600">Integral Risk</h3>
                    <p className="text-xl font-semibold text-gray-900">{updatedCalculations.integralRisk.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center mt-6 text-gray-600">
              The average loss from risk (mathematical expectation of loss) has {calculations.averageLoss > updatedCalculations.averageLoss ? 'decreased' : 'increased'} (instead of {calculations.averageLoss.toFixed(2)} it became {updatedCalculations.averageLoss.toFixed(2)}), but at the same time the dispersion (the degree of riskiness of the situation, the measure of dispersion) {calculations.variance > updatedCalculations.variance ? 'decreased' : 'increased'} (instead of {calculations.variance.toFixed(2)} it became {updatedCalculations.variance.toFixed(2)}). Accordingly, the standard deviation also {calculations.rmsLoss > updatedCalculations.rmsLoss ? 'decreased' : 'increased'} (instead of {calculations.rmsLoss.toFixed(2)} it became {updatedCalculations.rmsLoss.toFixed(2)}). The integral risk assessment {calculations.integralRisk > updatedCalculations.integralRisk ? 'decreased' : 'increased'} (instead of {calculations.integralRisk.toFixed(2)} it became {updatedCalculations.integralRisk.toFixed(2)}). As is known, when making a decision, the values of the integral risk assessment should be minimized. Consequently, from all of the above, we can conclude that consulting and installing a modern data protection system is very appropriate and effective in these conditions. This will reduce the likelihood of personal data theft, and also significantly will reduce the riskiness of the situation. That is why these events are very beneficial for our company.
            </p>
          </div>
          {/* New feature ends here */}

          <p className="text-center mt-6 text-gray-600">Made with ❤️ by Miraskhan Bekbolatov, Damira Alikhan</p>
        </div>
      </div>
    </div>
  );
}

export default CalculatorPage;