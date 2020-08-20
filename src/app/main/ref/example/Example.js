import React, { useEffect } from "react";

//fuse
import FusePageSimple from "@fuse/core/FusePageSimple";

//material
import { makeStyles } from "@material-ui/core/styles";

import { TableHelper } from "@helper";

import ExampleService from "app/services/example/ExampleService";

const useStyles = makeStyles(theme => ({
  layoutRoot: {},
}));

const getColumns = function () {
  return [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Type",
      accessor: "fileType",
    },
    {
      Header: "Action",
      accessor: "filePath",
    },
  ];
};
const getDate = function (files) {
  return [
    {
      name: "abc",
      filePath: "home/abc",
      fileType: "pdf",
    },
    {
      name: "xyz",
      filePath: "home/xyz",
      fileType: "pdf",
    },
    {
      name: "www",
      filePath: "home/www",
      fileType: "pdf",
    },
    {
      name: "rrr",
      filePath: "home/rrr",
      fileType: "pdf",
    },
  ];
};
function ExamplePage(props) {
  const classes = useStyles(props);
  const getExample = function () {
    ExampleService.getExample({
      pathParam: {
        id: 1,
      },
      dateCache: false,
    }).then(data => {
      console.log(data);
    });
  };
  const getAllExample = function () {
    ExampleService.getAllExample().then(data => {
      console.log(data);
    });
  };
  useEffect(() => {
    //getAllExample();
    //getExample();
  }, []);

  return (
    <FusePageSimple
      classes={{
        root: classes.layoutRoot,
      }}
      content={
        <div className="p-24">
          <h4>TableHelper</h4>
          <br />
          <TableHelper
            pageSize={2}
            remote={false}
            loading={false}
            data={getDate()}
            columns={getColumns()}
          />
        </div>
      }
    />
  );
}

export default ExamplePage;
