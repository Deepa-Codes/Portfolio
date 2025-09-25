import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
// import { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';
import Fade from 'react-reveal/Fade';
import Header from './Header';
import endpoints from '../constants/endpoints';
// import CertificationCard from './projects/ProjectCard';
import CertificationCard from './certifications/CertificationsCard';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  containerStyle: {
    marginBottom: 25,
  },
  showMoreStyle: {
    margin: 25,
  },
};

const Certifications = (props) => {
  // const theme = useContext(ThemeContext);
  const { header } = props;
  const [data, setData] = useState(null);
  // const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    fetch(endpoints.certifications, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);
  const numberOfItems = data ? data.certifications?.length : 0;
  return (
    <>
      <Header title={header} />
      {data
        ? (
          <div className="section-content-container">
            <Container style={styles.containerStyle}>
              <Row xs={1} sm={1} md={2} lg={3} className="g-4">
                {data.certifications?.slice(0, numberOfItems).map((certificate) => (
                  <Fade key={certificate.title}>
                    <CertificationCard certificate={certificate} />
                  </Fade>
                ))}
              </Row>
            </Container>
          </div>
        ) : <FallbackSpinner /> }
    </>
  );
};

Certifications.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Certifications;
