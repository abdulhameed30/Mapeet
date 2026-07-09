import React, { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import toast from "react-hot-toast";

export default function useSettlementModal() {
  const hotelData = JSON.parse(sessionStorage.getItem("data"));
  const [filterData, setFilterData] = useState([]);

  const [data, setData] = useState({
    absent_days: "",
    loans_amount: "",
    deductions_amount: "",
    salary_total: "",
  });
  const today = new Date().toISOString().slice(0, 10);
  const [fromDate, setFromDate] = useState(today);
  const [toDate, setToDate] = useState(today);
  const [employee, setEmployee] = useState(0);
  const [settlementNote, setSettlementNote] = useState("-");
  const [employeesData, setEmployeesData] = useState([]);

  const fetchData = async () => {
    const formData = new FormData();
    formData.append("employee_id", employee);
    formData.append("from_date", fromDate);
    formData.append("to_date", toDate);

    const response = await axiosClient.post(`/get-employee-report`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setFilterData(response.data.daily_report);
    setData({
      absent_days: response.data.salary_details.absent_days,
      loans_amount: response.data.salary_details.loans_amount,
      deductions_amount: response.data.salary_details.deductions_amount,
      salary_total: response.data.salary_details.net_salary,
    });
    console.log(response.data);
  };
  const getEmployeesData = async () => {
    const response = await axiosClient.get(
      `/get-current-employees/${hotelData.hotel_id}`,
    );
    setEmployeesData(response.data.employees);
  };

  useEffect(() => {
    getEmployeesData();
    fetchData();
  }, [employee, fromDate, toDate, hotelData.hotel_id]);

  const saveSettlement = async () => {
    const formData = new FormData();

    formData.append("settlement_employee_id", employee);
    formData.append("settlement_hotel_id", hotelData.hotel_id);
    formData.append("settlement_from_date", fromDate);
    formData.append("settlement_to_date", toDate);

    formData.append("settlement_absence_days", data.absent_days);
    formData.append("settlement_loans", data.loans_amount);
    formData.append("settlement_deductions", data.deductions_amount);
    formData.append("settlement_net_salary", data.salary_total);
    formData.append("settlement_note", settlementNote);

    try {
      const response = await axiosClient.post(
        "/create-employee-settlement",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );

      toast.success(response.data.message);
      return true;
    } catch (error) {
      console.log(error);
      alert("حدث خطأ أثناء الحفظ");
    }
  };

  const printReport = () => {
    const printContent = document.getElementById("printArea").innerHTML;

    const now = new Date();

    const formatDate = (date) => new Date(date).toLocaleDateString("en-CA");

    const dateTime = now.toLocaleString("en-CA");

    const selectedEmployee = employeesData.find(
      (e) => e.employee_id == employee,
    );

    const WinPrint = window.open("", "", "width=1000,height=1000");

    WinPrint.document.write(`
    <html>
      <head>
        <title>تسوية حساب موظف</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            direction: rtl;
            padding: 20px;
          }

          .header {
            text-align: center;
            margin-bottom: 20px;
          }

          .header h1 {
            margin: 0;
            font-size: 24px;
          }

          .header p {
            margin: 5px 0;
            font-size: 14px;
          }

          .info {
            display: flex;
            justify-content: space-between;
            margin-bottom: 15px;
            font-size: 14px;
          }

          .summary {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
            margin: 15px 0;
          }

          .card {
            border: 1px solid #000;
            padding: 10px;
            text-align: center;
            font-weight: bold;
            font-size: 14px;
          }
            @media print {
  select, input, {
    display: none;
  }
}

          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
          }

          th, td {
            border: 1px solid #000;
            padding: 6px;
            text-align: center;
            font-size: 13px;
          }

          th {
            background: #ddd;
          }

          .footer {
            margin-top: 40px;
            display: flex;
            justify-content: space-between;
          }

          .signature {
            margin-top: 50px;
            text-align: center;
          }

          @media print {
            body {
              -webkit-print-color-adjust: exact;
            }
          }
        </style>
      </head>

      <body>

        <div class="header">
          <h1>تسوية حساب موظف</h1>
          <p>نظام إدارة الفنادق</p>
        </div>

        <div class="info">
          <div>اسم الموظف: ${selectedEmployee?.employee_name || "-"}</div>
          <div>تاريخ الطباعة: ${dateTime}</div>
        </div>

        <div class="info">
          <div>من: ${formatDate(fromDate)}</div>
          <div>إلى: ${formatDate(toDate)}</div>
        </div>

        <div class="summary">
          <div class="card text-2xl">غياب: ${data.absent_days} يوم</div>
          <div class="card">سلف: ${data.loans_amount} ريال</div>
          <div class="card">خصومات: ${data.deductions_amount} ريال</div>
          <div class="card">الصافي: ${data.salary_total} ريال</div>
        </div>

        ${printContent}

        <div style="margin-top:20px;">
          <strong>ملاحظة:</strong> ${settlementNote}
        </div>

        <div class="footer">
          <div class="signature">
            توقيع المحاسب<br/>
            ____________
          </div>

          <div class="signature">
            توقيع الإدارة<br/>
            ____________
          </div>
        </div>

      </body>
    </html>
  `);

    WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print();
  };
  return {
    printReport,
    fetchData,
    data,
    setData,
    employee,
    setEmployee,
    toDate,
    setToDate,
    fromDate,
    setFromDate,
    today,
    filterData,
    setFilterData,
    saveSettlement,
    settlementNote,
    setSettlementNote,
    employeesData,
  };
}
