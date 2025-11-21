"use client";

import React from "react";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="container py-5">
      <h1 className="mb-4">Admin Dashboard</h1>
      <div className="row">
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Question Management</h5>
              <p className="card-text">Create, edit, and review questions.</p>
              <div className="d-grid gap-2">
                <Link href="/admin/create-question" className="btn btn-primary">
                  Create New Question
                </Link>
                <Link href="/admin/review" className="btn btn-warning">
                  Review Questions
                </Link>
                <Link href="/questions" className="btn btn-outline-primary">
                  View All Questions
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Add more admin widgets here */}
      </div>
    </div>
  );
}
