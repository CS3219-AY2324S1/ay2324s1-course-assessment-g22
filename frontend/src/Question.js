import React from "react";

export default function Question({ question }) {
  return (
    <>
      <label type="checkbox"></label>
      {question.title} &nbsp;
      {question.category} &nbsp;
      {question.complexity}
    </>
  );
}
