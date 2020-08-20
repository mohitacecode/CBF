import React from "react";
import { useTable, usePagination } from "react-table";
import { CSVLink } from "react-csv";
import styled from "@emotion/styled";
import _ from "@lodash";

import Icon from "@material-ui/core/Icon";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Pagination from "@material-ui/lab/Pagination";

import LoadingHelper from "./LoadingHelper";

// const SDropdown = styled(Dropdown)`
// 	.dropdown-menu {
// 		:before {
// 			content: none;
// 		}
// 	}
// `;

const StickyTable = styled(Table)`
  text-align: left;
  position: relative;
  border-collapse: collapse;
  & > thead > tr > th {
    background: white;
    position: sticky;
    top: 0;
    box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.4);
  }
`;

const StyledDD = styled.div`
  display: flex;
  justify-content: flex-end;
  > div {
    display: flex;
    padding: 3px 0px;
  }
`;

// const ListUnstyled = styled.ul`
// 	max-height: 200px;
// 	overflow: auto;
// `;

const PaginationBox = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 11px 2px;
  > div {
    display: flex;
    > ul {
      padding-right: 10px;
    }
    > div {
      width: 131px;
    }
  }
`;

const getHeaders = function (columns) {
  return columns.map(data => ({ label: data.Header, key: data.accessor }));
};

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu

// const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
// 	<Button
// 		variant="outline-light"
// 		size="sm"
// 		ref={ref}
// 		onClick={(e) => {
// 			e.preventDefault();
// 			onClick(e);
// 		}}
// 	>
// 		{children}
// 	</Button>
// ));

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it

// const CustomMenu = React.forwardRef(({ children, getToggleHideAllColumnsProps, style, className, "aria-labelledby": labeledBy }, ref) => {
// 	const [value, setValue] = useState("");
// 	const newStyle = { ...style, left: "auto", right: 0 };
// 	return (
// 		<div ref={ref} style={newStyle} className={className} aria-labelledby={labeledBy}>
// 			<FormControl
// 				autoFocus
// 				className="mx-3 my-2 w-auto"
// 				placeholder="Type to filter..."
// 				onChange={(e) => setValue(e.target.value)}
// 				value={value}
// 			/>
// 			<IndeterminateCheckbox className="mx-3 my-2 w-auto" {...getToggleHideAllColumnsProps()} />
// 			<Dropdown.Divider />
// 			<ListUnstyled className="list-unstyled">
// 				{React.Children.toArray(children).filter((child) => {
// 					return !value || child.props.searchText.toLocaleLowerCase().startsWith(value);
// 				})}
// 			</ListUnstyled>
// 		</div>
// 	);
// });

// const DD = ({ allColumns, getToggleHideAllColumnsProps }) => (
// 	<SDropdown>
// 		<Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
// 			<Icon>view_column</Icon>
// 		</Dropdown.Toggle>
// 		<Dropdown.Menu
// 			as={React.forwardRef((props, ref) => (
// 				<CustomMenu ref={ref} {...props} getToggleHideAllColumnsProps={getToggleHideAllColumnsProps} />
// 			))}
// 		>
// 			{allColumns &&
// 				allColumns.map((column, i) => (
// 					<Dropdown.Item eventKey={column.id} searchText={column.id} key={i}>
// 						<Form.Check type="checkbox" label={column.id} {...column.getToggleHiddenProps()} />
// 					</Dropdown.Item>
// 				))}
// 		</Dropdown.Menu>
// 	</SDropdown>
// );

// const IndeterminateCheckbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
// 	const defaultRef = React.useRef();
// 	const resolvedRef = ref || defaultRef;

// 	React.useEffect(() => {
// 		resolvedRef.current.indeterminate = indeterminate;
// 	}, [resolvedRef, indeterminate]);
// 	return <Form.Check className="checkbox checkbox-primary sm" type="checkbox" label={"Toggle All"} ref={resolvedRef} {...rest} />;
// });

export default function TableHelper({
  remote = true,
  pageSize = 50,
  columns,
  data,
  initialState,
  loading,
  totoalCount,
  onPageChange,
}) {
  // Use the state and functions returned from useTable to build your UI
  let tableConf = {
    columns,
    initialState,
    manualPagination: true,
    pageCount: Math.ceil(totoalCount / pageSize),
    pageSize: pageSize,
    data: _.isArray(data) ? data : [],
  };

  if (remote === false) {
    tableConf = {
      columns,
      initialState: { pageSize: pageSize },
      data: _.isArray(data) ? data : [],
    };
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page
    //rows,
    // The rest of these things are super handy, too ;)
    pageCount,
    gotoPage,
  } = useTable(tableConf, usePagination);
  // Render the UI for your table
  return (
    <LoadingHelper loading={loading} overlay={true}>
      <StyledDD>
        <div>
          {_.isArray(data) && data.length ? (
            <CSVLink filename={"report-p4.xlsx"} data={data} headers={getHeaders(columns)}>
              <Button>
                <Icon>get_app</Icon>
              </Button>
            </CSVLink>
          ) : null}
        </div>
        {/*<div>
					<DD allColumns={allColumns} getToggleHideAllColumnsProps={getToggleHideAllColumnsProps} />
				</div>*/}
      </StyledDD>
      <TableContainer component={Paper}>
        <StickyTable {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup, i) => (
              <TableRow {...headerGroup.getHeaderGroupProps()} key={`hrow-${i}`}>
                {headerGroup.headers.map((column, j) => (
                  <TableCell {...column.getHeaderProps()} key={`hrow-${i}-${j}`}>
                    {column.render("Header")}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page && page.length ? (
              page.map((row, i) => {
                prepareRow(row);
                return (
                  <TableRow {...row.getRowProps()} key={`prow-${i}`}>
                    {row.cells.map((cell, j) => {
                      return (
                        <TableCell {...cell.getCellProps()} key={`prow-${i}-${j}`}>
                          {cell.render("Cell")}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            ) : loading ? null : (
              <TableRow>{"No Data"}</TableRow>
            )}
          </TableBody>
        </StickyTable>
      </TableContainer>
      {page && page.length ? (
        <PaginationBox>
          <Pagination
            count={pageCount}
            color="primary"
            boundaryCount={2}
            onChange={(event, value) => {
              console.log(value);
              gotoPage(value - 1);
              if (onPageChange) {
                onPageChange(value);
              }
            }}
          />
        </PaginationBox>
      ) : null}
    </LoadingHelper>
  );
}
