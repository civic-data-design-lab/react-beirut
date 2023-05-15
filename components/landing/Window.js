import React, { useEffect, useState } from 'react';
import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import { TRANSLATIONS } from '../../lib/utils';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init(TRANSLATIONS);

export default function Window({ position, filepath }) {
  return (
    <img
      src={filepath}
      className="landing_window"
      style={{
        height: position.height,
        width: position.width,
        left: position.left,
        top: position.top,
      }}
    ></img>
  );
}
