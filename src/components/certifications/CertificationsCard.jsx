import React, { useContext } from 'react';
import { Card, Badge, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import ReactMarkdown from 'react-markdown';

const styles = {
  badgeStyle: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 5,
  },
  cardStyle: {
    borderRadius: 10,
  },
  cardTitleStyle: {
    fontSize: 24,
    fontWeight: 700,
  },
  cardTextStyle: {
    textAlign: 'center',
  },
  linkStyle: {
    textDecoration: 'none',
    padding: 10,
  },
  // buttonStyle: {
  //   //margin: 5,
  // },
};

const CertificationCard = (props) => {
  const theme = useContext(ThemeContext);
  const parseBodyText = (text) => <ReactMarkdown children={text} />;

  const { certificate } = props;

  return (
    <Col>
      <Card
        style={{
          ...styles.cardStyle,
          backgroundColor: theme.cardBackground,
          borderColor: theme.cardBorderColor,
        }}
        text={theme.bsSecondaryVariant}
      >
        <Card.Img variant="top" src={certificate?.image} />
        <Card.Body>
          <Card.Title style={styles.cardTitleStyle}>{certificate.title}</Card.Title>
          <Card.Text style={styles.cardTextStyle}>
            {parseBodyText(certificate.bodyText)}
          </Card.Text>
        </Card.Body>

        {/* <Card.Body>
          {certificate?.links?.map((link) => (
            <Button
              key={link.href}
              style={styles.buttonStyle}
              variant={'outline-' + theme.bsSecondaryVariant}
              onClick={() => window.open(link.href, '_blank')}
            >
              {link.text}
            </Button>
          ))}
        </Card.Body> */}
        {certificate.tags && (
          <Card.Footer style={{ backgroundColor: theme.cardFooterBackground }}>
            {certificate.tags.map((tag) => (
              <Badge
                key={tag}
                pill
                bg={theme.bsSecondaryVariant}
                text={theme.bsPrimaryVariant}
                style={styles.badgeStyle}
              >
                {tag}
              </Badge>
            ))}
          </Card.Footer>
        )}
      </Card>
    </Col>
  );
};

CertificationCard.propTypes = {
  certificate: PropTypes.shape({
    title: PropTypes.string.isRequired,
    bodyText: PropTypes.string,
    image: PropTypes.string,
    links: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })),
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default CertificationCard;
