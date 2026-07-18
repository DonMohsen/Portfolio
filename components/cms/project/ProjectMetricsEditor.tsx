"use client";

import type { ProjectMetricsRow } from "@/lib/projects/types";
import TextField from "@mui/material/TextField";

type ProjectMetricsEditorProps = {
  rows: ProjectMetricsRow[];
  onChange: (rows: ProjectMetricsRow[]) => void;
  textFieldStyles: object;
};

const EMPTY_ROW: ProjectMetricsRow = {
  label: "",
  before: "",
  after: "",
  delta: "",
};

export default function ProjectMetricsEditor({
  rows,
  onChange,
  textFieldStyles,
}: ProjectMetricsEditorProps) {
  const updateRow = (index: number, patch: Partial<ProjectMetricsRow>) => {
    onChange(rows.map((row, i) => (i === index ? { ...row, ...patch } : row)));
  };

  const addRow = () => onChange([...rows, { ...EMPTY_ROW }]);
  const removeRow = (index: number) =>
    onChange(rows.filter((_, i) => i !== index));

  return (
    <div className="w-full space-y-4 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
            Metrics (before / after)
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Quantified outcomes shown in the case study table.
          </p>
        </div>
        <button
          type="button"
          onClick={addRow}
          className="rounded-lg bg-purple-600 px-3 py-2 text-sm font-medium text-white hover:bg-purple-700"
        >
          Add row
        </button>
      </div>

      {rows.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No metrics yet. Add at least one row for BICM measurement.
        </p>
      ) : null}

      <div className="space-y-4">
        {rows.map((row, index) => (
          <div
            key={`metric-${index}`}
            className="grid grid-cols-1 gap-3 rounded-lg border border-gray-200 p-3 dark:border-gray-700 md:grid-cols-2"
          >
            <TextField
              fullWidth
              label="Metric label"
              value={row.label}
              onChange={(e) => updateRow(index, { label: e.target.value })}
              sx={textFieldStyles}
            />
            <TextField
              fullWidth
              label="Before"
              value={row.before ?? ""}
              onChange={(e) => updateRow(index, { before: e.target.value })}
              sx={textFieldStyles}
            />
            <TextField
              fullWidth
              label="After"
              value={row.after ?? ""}
              onChange={(e) => updateRow(index, { after: e.target.value })}
              sx={textFieldStyles}
            />
            <TextField
              fullWidth
              label="Change"
              value={row.delta ?? ""}
              onChange={(e) => updateRow(index, { delta: e.target.value })}
              sx={textFieldStyles}
            />
            <div className="md:col-span-2">
              <button
                type="button"
                onClick={() => removeRow(index)}
                className="text-sm text-red-500 hover:text-red-600"
              >
                Remove row
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
