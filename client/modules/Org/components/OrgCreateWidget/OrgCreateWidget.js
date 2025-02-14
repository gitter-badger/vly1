import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as Button from '../../../../components/Button/Button';

// Import Style
import styles from './OrgCreateWidget.css';

const options = [
  { value: 'admin', label: 'Administrator' },
  { value: 'corporate', label: 'Volunteer Provider' },
  { value: 'school', label: 'School' },
  { value: 'charity', label: 'Charity' },
  { value: 'content-provider', label: 'Activity Provider' },
];

export class OrgCreateWidget extends Component {

  constructor(props) {
    super(props);
    this.state = { orgType: options[1] };
  }

  handleChange = (orgType) => {
    this.setState({ orgType });
  }

  addOrg = () => {
    const nameRef = this.refs.name;
    const aboutRef = this.refs.about;
    const orgType = this.state.orgType; // this.refs.type;
    if (nameRef.value && aboutRef.value && orgType.value) {
      this.props.addOrg(nameRef.value, aboutRef.value, orgType.value);
      nameRef.value = aboutRef.value = '';
    }
  };

  cancelOrg = () => {
    this.props.cancelOrg();
  };

  render() {
    const cls = `${styles.form}  }`; // ${(this.props.showAddOrg ? styles.appear : '')
    const { orgType } = this.state;
    return (
      <div className={cls}>
        <div className={styles['form-type']}>
          <h2 className={styles['form-about']}><FormattedMessage id="createNewOrg" /></h2>
          <input placeholder={this.props.intl.messages.orgName} className={styles['form-field']} ref="name" />
          <input placeholder={this.props.intl.messages.orgAbout} className={styles['form-field']} ref="about" />
          <Select
            value={orgType}
            onChange={this.handleChange}
            options={options}
            className={styles['form-field']}
            placeholder={this.props.intl.messages.orgType}
            name="orgTypeSelect"
          />
          <Button.Primary className="submitOrg" onClick={this.addOrg} ><FormattedMessage id="submit" /></Button.Primary>
          <Button.Secondary className="cancelOrg" onClick={this.cancelOrg} ><FormattedMessage id="cancel" /></Button.Secondary>
        </div>
      </div>
    );
  }
}

OrgCreateWidget.propTypes = {
  addOrg: PropTypes.func.isRequired,
  cancelOrg: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(OrgCreateWidget);
