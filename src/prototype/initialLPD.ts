import lpdHelper from 'src/utils/lpdHelper';

const initialLPD = {
  sections: [],
  widgets: [
    lpdHelper.generateWidget(
      'request',
      'request',
      100,
      100,
      200,
      200,
      false,
      false,
      1,
      [],
    ),
  ],
}

export default initialLPD;