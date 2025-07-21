import React, { useState } from "react";
import InputType from "./InputType";
import { Link } from "react-router-dom";
import { handleLogin, handleRegister } from "../../../services/authService";

const Form = ({ formTitle, submitBtn, formType }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donor");
  const [name, setName] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [bloodBankName, setBloodBankName] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [bloodGroup, setBloodGroup] = useState("A+");
  return (
    <>
      <form
        onSubmit={(e) => {
          if (formType === "login") {
            return handleLogin(e, email, password, role);
          } else if (formType === "register") {
            console.log(bloodGroup, "bloodGroup");
            return handleRegister(e, email, password, role, name, organizationName, bloodGroup, hospitalName, bloodBankName, website, address, phone);
          }
        }}
      >
        <h1>{formTitle}</h1>
        <hr />

        {/* role radio buttons
        <div className="d-flex mb-4">
          <div className="form-check">
            <input type="radio" className="form-check-input" name="role" id="donorRadio" value={"donor"} onChange={(e) => setRole(e.target.value)} defaultChecked />
            <label htmlFor="donorRadio" className="form-check-label">
              Donor
            </label>
          </div>
          <div className="form-check ms-2">
            <input type="radio" className="form-check-input" name="role" id="adminRadio" value={"admin"} onChange={(e) => setRole(e.target.value)} />
            <label htmlFor="adminRadio" className="form-check-label">
              Admin
            </label>
          </div>
          <div className="form-check ms-2">
            <input type="radio" className="form-check-input" name="role" id="hospitalRadio" value={"hospital"} onChange={(e) => setRole(e.target.value)} />
            <label htmlFor="hospitalRadio" className="form-check-label">
              Hospital
            </label>
          </div>
          <div className="form-check ms-2">
            <input type="radio" className="form-check-input" name="role" id="organizationRadio" value={"organization"} onChange={(e) => setRole(e.target.value)} />
            <label htmlFor="organizationRadio" className="form-check-label">
              Organization
            </label>
          </div>
        </div> */}

        {/* switch statement */}
        {(() => {
          switch (true) {
            case formType === "login": {
              return (
                <>
                  <InputType
                    labelText={"Email"}
                    labelFor={"email"}
                    inputType={"email"}
                    name={"email"}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <InputType
                    labelText={"Password"}
                    labelFor={"password"}
                    inputType={"password"}
                    name={"password"}
                    value={password}
                    onChange={(p) => {
                      setPassword(p.target.value);
                    }}
                  />

                  {/* role dropdown */}
                  <div className="mb-4">
                    <label htmlFor="roleSelect" className="form-label">
                      What fits best for you?
                    </label>
                    <select id="roleSelect" className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
                      <option value="donor">Donor</option>
                      <option value="admin">Admin</option>
                      <option value="hospital">Hospital</option>
                      <option value="organization">Organization</option>
                      <option value="bloodBank">Blood Bank</option>
                    </select>
                  </div>
                </>
              );
            }

            case formType === "register": {
              return (
                <>
                  {/* role dropdown */}
                  <div className="mb-4">
                    <label htmlFor="roleSelect" className="form-label">
                      What fits best for you?
                    </label>
                    <select id="roleSelect" className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
                      <option value="donor">Donor</option>
                      {/* <option value="admin">Admin</option> */}
                      <option value="hospital">Hospital</option>
                      <option value="organization">Organization</option>
                      <option value="bloodBank">Blood Bank</option>
                    </select>
                  </div>

                  {role === "donor" && (
                    <>
                      <InputType
                        labelText={"Name"}
                        labelFor={"name"}
                        inputType={"text"}
                        name={"name"}
                        value={name}
                        onChange={(p) => {
                          setName(p.target.value);
                        }}
                      />
                      <div className="mb-4">
                        <label htmlFor="bloodGroupSelect" className="form-label">
                          Blood Group
                        </label>
                        <select id="bloodGroupSelect" className="form-select" value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)}>
                          <option value="A+">A+</option>
                          <option value="B+">B+</option>
                          <option value="AB+">AB+</option>
                          <option value="O+">O+</option>
                          <option value="A-">A-</option>
                          <option value="B-">B-</option>
                          <option value="AB-">AB-</option>
                          <option value="O-">O-</option>
                        </select>
                      </div>
                    </>
                  )}

                  {role === "organization" && (
                    <InputType
                      labelText={"Organization Name"}
                      labelFor={"organizationName"}
                      inputType={"text"}
                      name={"organizationName"}
                      value={organizationName}
                      onChange={(p) => {
                        setOrganizationName(p.target.value);
                      }}
                    />
                  )}

                  {role === "hospital" && (
                    <InputType
                      labelText={"Hospital Name"}
                      labelFor={"hospitalName"}
                      inputType={"text"}
                      name={"hospitalName"}
                      value={hospitalName}
                      onChange={(p) => {
                        setHospitalName(p.target.value);
                      }}
                    />
                  )}

                  {role === "bloodBank" && (
                    <InputType
                      labelText={"Blood Bank Name"}
                      labelFor={"bloodBankName"}
                      inputType={"text"}
                      name={"bloodBankName"}
                      value={bloodBankName}
                      onChange={(p) => {
                        setBloodBankName(p.target.value);
                      }}
                    />
                  )}

                  <InputType
                    labelText={"Email"}
                    labelFor={"email"}
                    inputType={"email"}
                    name={"email"}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <InputType
                    labelText={"Password"}
                    labelFor={"password"}
                    inputType={"password"}
                    name={"password"}
                    value={password}
                    onChange={(p) => {
                      setPassword(p.target.value);
                    }}
                  />
                  {role !== "donor" && (
                    <>
                      <InputType
                        labelText={"Website"}
                        labelFor={"website"}
                        inputType={"text"}
                        name={"website"}
                        value={website}
                        onChange={(p) => {
                          setWebsite(p.target.value);
                        }}
                      />
                    </>
                  )}

                  <InputType
                    labelText={"address"}
                    labelFor={"address"}
                    inputType={"text"}
                    name={"address"}
                    value={address}
                    onChange={(p) => {
                      setAddress(p.target.value);
                    }}
                  />

                  <InputType
                    labelText={"Phone"}
                    labelFor={"phone"}
                    inputType={"text"}
                    name={"phone"}
                    value={phone}
                    onChange={(p) => {
                      setPhone(p.target.value);
                    }}
                  />
                </>
              );
            }

            default: {
              return (
                <>
                  <h1 className="text-danger">Some error in form</h1>
                </>
              );
            }
          }
        })()}

        <div className="d-flex flex-row justify-content-between">
          {formType === "login" ? (
            <p>
              Not Registerd yet? Please Register
              <Link to="/register"> Here!</Link>
            </p>
          ) : (
            <p>
              Already a User? Please
              <Link to="/login"> Login!</Link>
            </p>
          )}
          <button className="btn btn-primary" type="submit">
            {submitBtn}
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;
