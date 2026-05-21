"use client";

import { useState, useEffect } from "react";

interface DailyStat {
    date: string;
    count: number;
}

interface AdvertReport {
    id: string;
    title: string;
    position: string;
    status: string;
    startDate: string | null;
    endDate: string | null;
    totalClicks: number;
    totalImpressions: number;
    ctr: number;
    dailyClicks: DailyStat[];
    dailyImpressions: DailyStat[];
}

function downloadCSV(reports: AdvertReport[]) {
    const rows: string[] = [];
    rows.push("Advert ID,Title,Position,Status,Campaign Start,Campaign End,Total Clicks,Total Impressions,CTR (%),Date,Clicks,Impressions");

    for (const report of reports) {
        const allDates = Array.from(
            new Set([
                ...report.dailyClicks.map((d) => d.date),
                ...report.dailyImpressions.map((d) => d.date),
            ])
        ).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

        if (allDates.length === 0) {
            rows.push(
                [
                    report.id,
                    `"${report.title.replace(/"/g, "\"\"")}"`,
                    report.position,
                    report.status,
                    report.startDate || "",
                    report.endDate || "",
                    report.totalClicks,
                    report.totalImpressions,
                    report.ctr,
                    "",
                    "",
                    "",
                ].join(",")
            );
        } else {
            for (const date of allDates) {
                const clicks = report.dailyClicks.find((d) => d.date === date)?.count || 0;
                const impressions = report.dailyImpressions.find((d) => d.date === date)?.count || 0;
                rows.push(
                    [
                        report.id,
                        `"${report.title.replace(/"/g, "\"\"")}"`,
                        report.position,
                        report.status,
                        report.startDate || "",
                        report.endDate || "",
                        report.totalClicks,
                        report.totalImpressions,
                        report.ctr,
                        date,
                        clicks,
                        impressions,
                    ].join(",")
                );
            }
        }
    }

    const csvContent = "\uFEFF" + rows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `advert-reports-${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

export default function AdvertsReportPage() {
    const [reports, setReports] = useState<AdvertReport[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadReports = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch("/api/admin/adverts/report");
                if (!res.ok) throw new Error("Failed to load reports");
                const data = await res.json();
                setReports(data.reports || []);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to load reports");
            } finally {
                setLoading(false);
            }
        };

        loadReports();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto mb-4"></div>
                    <p className="text-muted">Loading advert reports...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <p className="text-red-500 mb-2">Error: {error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="text-accent hover:underline"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Advert Reports</h1>
                    <p className="text-muted">Detailed performance from start of advert to end</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => downloadCSV(reports)}
                        className="rounded-lg border border-border bg-background px-4 py-2 text-sm hover:bg-accent/10 transition-colors"
                    >
                        Download CSV
                    </button>
                    <button
                        onClick={() => window.location.reload()}
                        className="rounded-lg border border-border bg-background px-4 py-2 text-sm hover:bg-accent/10 transition-colors"
                    >
                        Refresh
                    </button>
                </div>
            </div>

            {reports.length === 0 ? (
                <div className="rounded-xl border border-border bg-card p-8 text-center">
                    <p className="text-muted">No adverts found. Create adverts to see performance reports.</p>
                </div>
            ) : (
                reports.map((report) => (
                    <div
                        key={report.id}
                        className="rounded-xl border border-border bg-card p-6 space-y-4"
                    >
                        {/* Title & Status */}
                        <div className="flex items-start justify-between">
                            <div>
                                <h2 className="text-xl font-semibold">{report.title}</h2>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="px-2 py-0.5 rounded-full text-xs bg-accent/10 text-accent">
                                        {report.position}
                                    </span>
                                    <span
                                        className={`px-2 py-0.5 rounded-full text-xs ${report.status === "active"
                                            ? "bg-green-500/10 text-green-500"
                                            : "bg-red-500/10 text-red-500"
                                            }`}
                                    >
                                        {report.status}
                                    </span>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-3xl font-bold text-accent">{report.ctr}%</p>
                                <p className="text-xs text-muted">CTR</p>
                            </div>
                        </div>

                        {/* Campaign Dates */}
                        <div className="text-sm text-muted">
                            <span className="font-medium">Campaign:</span>{" "}
                            {report.startDate
                                ? new Date(report.startDate).toLocaleDateString()
                                : "Always"}{" "}
                            —{" "}
                            {report.endDate
                                ? new Date(report.endDate).toLocaleDateString()
                                : "Ongoing"}
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="rounded-lg border border-border bg-background p-4">
                                <p className="text-sm text-muted">Total Clicks</p>
                                <p className="text-2xl font-bold">{report.totalClicks.toLocaleString()}</p>
                            </div>
                            <div className="rounded-lg border border-border bg-background p-4">
                                <p className="text-sm text-muted">Total Impressions</p>
                                <p className="text-2xl font-bold">{report.totalImpressions.toLocaleString()}</p>
                            </div>
                            <div className="rounded-lg border border-border bg-background p-4">
                                <p className="text-sm text-muted">Click-Through Rate</p>
                                <p className="text-2xl font-bold">{report.ctr}%</p>
                            </div>
                            <div className="rounded-lg border border-border bg-background p-4">
                                <p className="text-sm text-muted">Active Days</p>
                                <p className="text-2xl font-bold">
                                    {Math.max(report.dailyClicks.length, report.dailyImpressions.length)}
                                </p>
                            </div>
                        </div>

                        {/* Daily Breakdown */}
                        {(report.dailyClicks.length > 0 || report.dailyImpressions.length > 0) && (
                            <div>
                                <h3 className="text-sm font-semibold mb-2">Daily Breakdown</h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-border">
                                                <th className="text-left py-2 px-3 font-medium text-muted">Date</th>
                                                <th className="text-right py-2 px-3 font-medium text-muted">Clicks</th>
                                                <th className="text-right py-2 px-3 font-medium text-muted">Impressions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Array.from(
                                                new Set([
                                                    ...report.dailyClicks.map((d) => d.date),
                                                    ...report.dailyImpressions.map((d) => d.date),
                                                ])
                                            )
                                                .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
                                                .map((date) => {
                                                    const clicks =
                                                        report.dailyClicks.find((d) => d.date === date)?.count || 0;
                                                    const impressions =
                                                        report.dailyImpressions.find((d) => d.date === date)?.count || 0;
                                                    return (
                                                        <tr key={date} className="border-b border-border last:border-0">
                                                            <td className="py-2 px-3">{new Date(date).toLocaleDateString()}</td>
                                                            <td className="py-2 px-3 text-right font-medium text-accent">
                                                                {clicks.toLocaleString()}
                                                            </td>
                                                            <td className="py-2 px-3 text-right font-medium">
                                                                {impressions.toLocaleString()}
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}
