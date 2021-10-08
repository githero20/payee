import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { HOME, PAYMENT, TRANSACTION_HISTORY } from '../services/routes';

function PaymentDashboardContainer(props) {
  return (
    <PaymentDashboardContainer.Wrapper>
      <nav className="navbar navbar-light bg-dark shadow">
        <li className="nav-item">
          <Link className="navbar-brand text-info" to={HOME}>
            Payee
          </Link>
        </li>

        <ul className="nav justify-content-right">
          <li className="nav-item">
            <Link
              className={`nav-link active ${
                window.location.pathname === PAYMENT
                  ? 'disabled text-primary'
                  : 'text-info'
              }`}
              to={PAYMENT}
            >
              Payment
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link active ${
                window.location.pathname === TRANSACTION_HISTORY
                  ? 'disabled text-primary'
                  : 'text-info'
              }`}
              to={TRANSACTION_HISTORY}
            >
              History
            </Link>
          </li>
        </ul>
      </nav>
      {props.children}
    </PaymentDashboardContainer.Wrapper>
  );
}

PaymentDashboardContainer.Wrapper = styled.div`
  .container {
    background: #ffffff;
    .row {
      .col-sm-8 {
        h1 {
          font-size: 70px;
          text-shadow: 2px 2px #000000;
        }
      }
      .col-sm-4 {
        display: flex;
        justify-content: center;

        img {
          width: 80%;
        }
      }
    }
  }
  @media (max-width: 520px) {
    .container {
      .row {
        .col-sm-8 {
          
        }
        .col-sm-4 {
          i
        }
      }
    }
  }
`;

export default PaymentDashboardContainer;
