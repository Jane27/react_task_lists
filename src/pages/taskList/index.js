import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./index.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField, TableHeader, TableRow } from "../../components";
import detailField from "../../assets/detailFields";
import { fetchLists, updateTasks, searchTask } from "../../actions/task";
import { getListsFilteredBySearchTerm } from "../../selectors";
import { Circle } from "react-spinners-css";

const getKeyName = (array) => {
  let keyName = Object.keys(array[0]);
  return keyName;
};

const TaskList = ({
  error,
  loading,
  displayedData,
  updateTask,
  getTasks,
  searchTerm,
  search,
}) => {
  const [selectedId, setSelectedId] = useState(0);

  useEffect(() => {
    getTasks();
  }, []);

  const onRadioSelected = (e) => {
    setSelectedId(Number(e.currentTarget.value));
  };

  console.log(detailField);
  let keys = [];
  if (displayedData.length > 0) {
    keys = getKeyName(displayedData);
  }

  return (
    <>
      {loading && (
        <div className="cover">
          <Circle />
        </div>
      )}
      {error && <p>{error}</p>}
      <div className="filter">
        <label>Filter By Name:</label>
        <input
          type="text"
          placeholder="Type name to search"
          value={searchTerm}
          onChange={(e) => search(e.target.value)}
        ></input>
      </div>
      <div className="wrapper">
        {displayedData.length > 0 && (
          <div className="list">
            <table className="table">
              <tbody>
                <tr>
                  <TableHeader keys={keys} />
                </tr>
                {displayedData.map((task) => (
                  <tr key={task.id}>
                    <TableRow item={task} keys={keys} />
                    <td>
                      <input
                        key={task.id}
                        type="radio"
                        name={task.id}
                        value={task.id}
                        checked={task.id === selectedId}
                        onChange={onRadioSelected}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {selectedId !== 0 && (
          <div className="detail">
            <Formik
              enableReinitialize
              initialValues={displayedData.find(
                (task) => task.id === selectedId
              )}
              validationSchema={Yup.object({
                name: Yup.string().required("Required"),
              })}
              onSubmit={async (values) => {
                updateTask(values);
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <h2>Detail</h2>
                  {detailField.map((item, index) => (
                    <TextField
                      key={index}
                      type={item.type}
                      label={item.label}
                      name={item.name}
                      disabled={item.disabled}
                    />
                  ))}
                  <button disabled={isSubmitting} type="submit">
                    {isSubmitting ? "Submitting" : "Submit"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  displayedData: getListsFilteredBySearchTerm(state),
  loading: state.taskReducer.loading,
  error: state.taskReducer.error,

  searchTerm: state.searchTerm,
});
const mapDispatchToProps = {
  getTasks: fetchLists,
  updateTask: updateTasks,
  search: searchTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
