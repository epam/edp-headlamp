export const SORT_ORDERS = {
  UNSET: false,
  ASC: 'asc',
  DESC: 'desc',
} as const;

export const SORT_DEFAULTS = {
  ORDER: SORT_ORDERS.DESC,
  SORT_BY: 'name',
};

export const PAGINATION_DEFAULTS = {
  SHOW: true,
  REFLECT_IN_URL: false,
  INITIAL_PAGE: 0,
  ROWS_PER_PAGE: 10,
} as const;

export const SELECTION_DEFAULTS = {
  IS_ROW_SELECTABLE: () => true,
} as const;

const TABLE_CELL_DEFAULT_PROPS = {
  align: 'left',
  colSpan: 1,
} as const;

export const TABLE_CELL_DEFAULTS = {
  SHOW: true,
  WIDTH: 5, // in percent
  IS_FIXED: false,
  PROPS: TABLE_CELL_DEFAULT_PROPS,
} as const;

export const TABLE_SETTINGS_DEFAULTS = {
  SHOW: true,
} as const;

export const TABLE_DEFAULT_WIDTH = 100;
export const TABLE_DEFAULT_WIDTH_WITH_SELECTION = TABLE_DEFAULT_WIDTH - TABLE_CELL_DEFAULTS.WIDTH;
