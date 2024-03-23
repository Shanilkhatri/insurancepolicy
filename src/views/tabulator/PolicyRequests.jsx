import {
  Lucide,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownContent,
  DropdownItem,
} from "@/base-components";
import xlsx from "xlsx";
import { useEffect, useRef, createRef, useState } from "react";
import { createIcons, icons } from "lucide";
import Tabulator from "tabulator-tables";
import dom from "@left4code/tw-starter/dist/js/dom";

function Main() {
  const tableRef = createRef();
  const tabulator = useRef();
  const [filter, setFilter] = useState({
    field: "name",
    type: "like",
    value: "",
  });

  const imageAssets = import.meta.globEager(
    `/src/assets/images/*.{jpg,jpeg,png,svg}`
  );
  const initTabulator = () => {
    tabulator.current = new Tabulator(tableRef.current, {
      // ajaxURL: "https://dummy-data.left4code.com",
      // ajaxFiltering: true,
      // ajaxSorting: true,
      printAsHtml: true,
      printStyled: true,
      pagination: "remote",
      paginationSize: 10,
      
      paginationSizeSelector: [10, 20, 30, 40],
      layout: "fitColumns",
      responsiveLayout: "collapse",
      placeholder: "No matching records found",
      columns: [
        {
          formatter: "responsiveCollapse",
          width: 40,
          minWidth: 30,
          hozAlign: "center",
          resizable: false,
          headerSort: false,
        },

        // For HTML table
        {
          title: "REQUEST ID",
          headerHozAlign: "center",
          minWidth: 100,
          responsive: 0,
          field: "request_id",
          hozAlign: "center",
          vertAlign: "middle",
          print: false,
          download: false,
          formatter(cell) {
            return `<div>
                ${
                  cell.getData().request_id
                }
                </div>`;
          },
        },
        {
          title: "USER NAME",
          headerHozAlign: "center",
          minWidth: 200,
          responsive: 0,
          field: "user_name",
          hozAlign: "center",
          vertAlign: "middle",
          print: false,
          download: false,
          formatter(cell) {
            return `<div>
                <div class="font-medium whitespace-nowrap">${
                  cell.getData().user_name
                }</div>
                
              </div>`;
          },
        },
        {
          title: "POLICY NAME",
          headerHozAlign: "center",
          minWidth: 200,
          responsive: 0,
          field: "policy_name",
          hozAlign: "center",
          vertAlign: "middle",
          print: false,
          download: false,
          formatter(cell) {
            return `<div>
                <div class="font-medium whitespace-nowrap">${
                  cell.getData().policy_name
                }</div>
                
              </div>`;
          },
        },
        {
          title: "POLICY PRICE",
          headerHozAlign: "center",
          minWidth: 200,
          field: "policy_price",
          hozAlign: "center",
          vertAlign: "middle",
          print: false,
          download: false,
          formatter(cell) {
            return `<div>
            <div class="font-medium whitespace-nowrap">$${
              cell.getData().policy_price
            }</div>
            
          </div>`;
          },
        },
        {
          title: "DATE",
          headerHozAlign: "center",
          minWidth: 200,
          field: "request_date",
          hozAlign: "center",
          vertAlign: "middle",
          print: false,
          download: false,
          formatter(cell) {
            return `<div>
            <div class="font-medium whitespace-nowrap">${
              cell.getData().request_date
            }</div>
            
          </div>`;
          },
        },
        {
          title: "ACTION",
          headerHozAlign: "center",
          minWidth: 200,
          field: "request_status",
          hozAlign: "center",
          vertAlign: "middle",
          print: false,
          download: false,
          formatter(cell) {
            return `<div className="flex items-center lg:justify-center">
                  ${
                    cell.getData().request_status == "pending" ? `<button class="btn btn-success mr-1 mb-2">
                      <i data-lucide="check" className="w-2 h-2 mr-2"></i>
                    </button>
                      <button class="btn btn-danger mr-1 mb-2">
                      <i data-lucide="trash" className="w-2 h-2 mr-2"></i>
                    </button>` 
                    :
                    cell.getData().request_status == "success" ?  
                    `<button class="btn btn-rounded-success w-24 mr-1 mb-2">
                    Success
                  </button>` : `<button class="btn btn-rounded-danger w-24 mr-1 mb-2">
                  Rejected
                </button>`
             }
                    </div>`;
          }
        },
        // {
        //   title: "STATUS",
        //   minWidth: 200,
        //   field: "status",
        //   hozAlign: "center",
        //   vertAlign: "middle",
        //   print: false,
        //   download: false,
        //   formatter(cell) {
        //     return `<div class="flex items-center lg:justify-center ${
        //       cell.getData().status ? "text-success" : "text-danger"
        //     }">
        //         <i data-lucide="check-square" class="w-4 h-4 mr-2"></i> ${
        //           cell.getData().status ? "Active" : "Inactive"
        //         }
        //       </div>`;
        //   },
        // },
        // {
        //   title: "ACTIONS",
        //   minWidth: 200,
        //   field: "actions",
        //   responsive: 1,
        //   hozAlign: "center",
        //   vertAlign: "middle",
        //   print: false,
        //   download: false,
        //   formatter() {
        //     const a = dom(`<div class="flex lg:justify-center items-center">
        //         <a class="flex items-center mr-3" href="javascript:;">
        //           <i data-lucide="check-square" class="w-4 h-4 mr-1"></i> Edit
        //         </a>
        //         <a class="flex items-center text-danger" href="javascript:;">
        //           <i data-lucide="trash-2" class="w-4 h-4 mr-1"></i> Delete
        //         </a>
        //       </div>`);
        //     dom(a).on("click", function () {
        //       // On click actions
        //     });

        //     return a[0];
        //   },
        // },

        // For print format
        // {
        //   title: "PRODUCT NAME",
        //   field: "name",
        //   visible: false,
        //   print: true,
        //   download: true,
        // },
        // {
        //   title: "CATEGORY",
        //   field: "category",
        //   visible: false,
        //   print: true,
        //   download: true,
        // },
        // {
        //   title: "REMAINING STOCK",
        //   field: "remaining_stock",
        //   visible: false,
        //   print: true,
        //   download: true,
        // },
        // {
        //   title: "STATUS",
        //   field: "status",
        //   visible: false,
        //   print: true,
        //   download: true,
        //   formatterPrint(cell) {
        //     return cell.getValue() ? "Active" : "Inactive";
        //   },
        // },
        // {
        //   title: "IMAGE 1",
        //   field: "images",
        //   visible: false,
        //   print: true,
        //   download: true,
        //   formatterPrint(cell) {
        //     return cell.getValue()[0];
        //   },
        // },
        // {
        //   title: "IMAGE 2",
        //   field: "images",
        //   visible: false,
        //   print: true,
        //   download: true,
        //   formatterPrint(cell) {
        //     return cell.getValue()[1];
        //   },
        // },
        // {
        //   title: "IMAGE 3",
        //   field: "images",
        //   visible: false,
        //   print: true,
        //   download: true,
        //   formatterPrint(cell) {
        //     return cell.getValue()[2];
        //   },
        // },
      ],
      renderComplete() {
        createIcons({
          icons,
          "stroke-width": 1.5,
          nameAttr: "data-lucide",
        });
      },
    });
    tabulator.current.setData(
       [
        {
        request_id: 1,
        user_name: "Shaanil Khatri",
        policy_name: "LIC",
        policy_price: 1500,
        request_date: "12/02/2024",
        request_status: "pending"
      },
      {
        request_id: 2,
        user_name: "Jhummi Khatri",
        policy_name: "LIC",
        policy_price: 1600,
        request_date: "02/03/2024",
        request_status: "success"
      },
      {
        request_id: 3,
        user_name: "Shaily Tomar",
        policy_name: "MAX BUPA",
        policy_price: 555,
        request_date: "12/03/2024",
        request_status: "rejected"
      }
    
    ]
    )
  };

  // Redraw table onresize
  const reInitOnResizeWindow = () => {
    window.addEventListener("resize", () => {
      tabulator.current.redraw();
      createIcons({
        icons,
        "stroke-width": 1.5,
        nameAttr: "data-lucide",
      });
    });
  };

  // Filter function
  const onFilter = () => {
    tabulator.current.setFilter(filter.field, filter.type, filter.value);
  };

  // On reset filter
  const onResetFilter = () => {
    setFilter({
      ...filter,
      field: "name",
      type: "like",
      value: "",
    });
    onFilter();
  };

  // Export
  const onExportCsv = () => {
    tabulator.current.download("csv", "data.csv");
  };

  const onExportJson = () => {
    tabulator.current.download("json", "data.json");
  };

  const onExportXlsx = () => {
    const win = window;
    win.XLSX = xlsx;
    tabulator.current.download("xlsx", "data.xlsx", {
      sheetName: "Products",
    });
  };

  const onExportHtml = () => {
    tabulator.current.download("html", "data.html", {
      style: true,
    });
  };

  // Print
  const onPrint = () => {
    tabulator.current.print();
  };

  useEffect(() => {
    initTabulator();
    reInitOnResizeWindow();
  }, []);

  return (
    <>
      <div className="intro-y flex flex-col sm:flex-row items-center mt-8">
        <h2 className="text-lg font-medium mr-auto">Active policies</h2>
        <div className="w-full sm:w-auto flex mt-4 sm:mt-0">
          
         
        </div>
      </div>
      {/* BEGIN: HTML Table Data */}
      <div className="intro-y box p-5 mt-5">
        <div className="flex flex-col sm:flex-row sm:items-end xl:items-start">
          <form id="tabulator-html-filter-form" className="xl:flex sm:mr-auto">
            <div className="sm:flex items-center sm:mr-4">
              <label className="w-12 flex-none xl:w-auto xl:flex-initial mr-2">
                Field
              </label>
              <select
                id="tabulator-html-filter-field"
                value={filter.field}
                onChange={(e) => {
                  setFilter({
                    ...filter,
                    field: e.target.value,
                  });
                }}
                className="form-select w-full sm:w-32 2xl:w-full mt-2 sm:mt-0 sm:w-auto"
              >
                <option value="policy_name">Name</option>
                <option value="policy_price">Price</option>
              </select>
            </div>
            <div className="sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
              <label className="w-12 flex-none xl:w-auto xl:flex-initial mr-2">
                Type
              </label>
              <select
                id="tabulator-html-filter-type"
                value={filter.type}
                onChange={(e) => {
                  setFilter({
                    ...filter,
                    type: e.target.value,
                  });
                }}
                className="form-select w-full mt-2 sm:mt-0 sm:w-auto"
              >
                <option value="like">like</option>
              </select>
            </div>
            <div className="sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
              <label className="w-12 flex-none xl:w-auto xl:flex-initial mr-2">
                Value
              </label>
              <input
                id="tabulator-html-filter-value"
                value={filter.value}
                onChange={(e) => {
                  setFilter({
                    ...filter,
                    value: e.target.value,
                  });
                }}
                type="text"
                className="form-control sm:w-40 2xl:w-full mt-2 sm:mt-0"
                placeholder="Search..."
              />
            </div>
            <div className="mt-2 xl:mt-0">
              <button
                id="tabulator-html-filter-go"
                type="button"
                className="btn btn-primary w-full sm:w-16"
                onClick={onFilter}
              >
                Go
              </button>
              <button
                id="tabulator-html-filter-reset"
                type="button"
                className="btn btn-secondary w-full sm:w-16 mt-2 sm:mt-0 sm:ml-1"
                onClick={onResetFilter}
              >
                Reset
              </button>
            </div>
          </form>
          {/* <div className="flex mt-5 sm:mt-0">
            <button
              id="tabulator-print"
              className="btn btn-outline-secondary w-1/2 sm:w-auto mr-2"
              onClick={onPrint}
            >
              <Lucide icon="Printer" className="w-4 h-4 mr-2" /> Print
            </button>
            <Dropdown className="w-1/2 sm:w-auto">
              <DropdownToggle className="btn btn-outline-secondary w-full sm:w-auto">
                <Lucide icon="FileText" className="w-4 h-4 mr-2" /> Export
                <Lucide
                  icon="ChevronDown"
                  className="w-4 h-4 ml-auto sm:ml-2"
                />
              </DropdownToggle>
              <DropdownMenu className="w-40">
                <DropdownContent>
                  <DropdownItem onClick={onExportCsv}>
                    <Lucide icon="FileText" className="w-4 h-4 mr-2" /> Export
                    CSV
                  </DropdownItem>
                  <DropdownItem onClick={onExportJson}>
                    <Lucide icon="FileText" className="w-4 h-4 mr-2" /> Export
                    JSON
                  </DropdownItem>
                  <DropdownItem onClick={onExportXlsx}>
                    <Lucide icon="FileText" className="w-4 h-4 mr-2" /> Export
                    XLSX
                  </DropdownItem>
                  <DropdownItem onClick={onExportHtml}>
                    <Lucide icon="FileText" className="w-4 h-4 mr-2" /> Export
                    HTML
                  </DropdownItem>
                </DropdownContent>
              </DropdownMenu>
            </Dropdown>
          </div> */}
        </div>
        <div className="overflow-x-auto scrollbar-hidden">
          <div
            id="tabulator"
            ref={tableRef}
            className="mt-5 table-report table-report--tabulator"
          ></div>
        </div>
      </div>
      {/* END: HTML Table Data */}
    </>
  );
}

export default Main;
