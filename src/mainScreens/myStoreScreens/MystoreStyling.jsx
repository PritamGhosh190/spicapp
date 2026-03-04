import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// Responsive card width: 2 columns with padding
const CARD_MARGIN = 10;
const CARD_WIDTH = (width - CARD_MARGIN * 3) / 2;

export const COLORS = {
  background: '#F4F6FA',
  cardBg: '#FFFFFF',
  cardBorder: '#E8ECF4',
  cardSelectedBorder: '#F5A623',
  primary: '#F5A623',
  primaryLight: '#FFF3E0',
  textPrimary: '#1A1A2E',
  textSecondary: '#6B7280',
  retailerBadge: '#E8F4FD',
  retailerText: '#2196F3',
  wholesalerBadge: '#EDE7F6',
  wholesalerText: '#7C4DFF',
  activeBadge: '#E8F5E9',
  activeText: '#43A047',
  iconColor: '#F5A623',
  divider: '#F0F2F8',
  btnViewBg: '#FFF3E0',
  btnViewText: '#F5A623',
  btnViewBorder: '#F5A623',
  btnCreateBg: '#F5A623',
  btnCreateText: '#FFFFFF',
  shadow: '#B0BEC5',
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  // Header
  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: 52,
    paddingBottom: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardBorder,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textPrimary,
    letterSpacing: 0.3,
  },
  headerSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // List
  listContent: {
    padding: CARD_MARGIN,
    paddingBottom: 24,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },

  // Card
  card: {
    width: CARD_WIDTH,
    backgroundColor: COLORS.cardBg,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: COLORS.cardBorder,
    marginBottom: CARD_MARGIN,
    padding: 14,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  cardSelected: {
    borderColor: COLORS.cardSelectedBorder,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.25,
    elevation: 6,
  },

  // Card Header Row
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  storeIconWrapper: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  storeName: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
    flex: 1,
    letterSpacing: 0.1,
  },

  // Info rows
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  infoIcon: {
    marginRight: 5,
    marginTop: 1,
  },
  infoText: {
    fontSize: 11.5,
    color: COLORS.textSecondary,
    flex: 1,
    lineHeight: 16,
  },
  ownerLabel: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginBottom: 6,
  },
  ownerName: {
    fontWeight: '600',
    color: COLORS.textPrimary,
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.divider,
    marginVertical: 10,
  },

  // Badges row
  badgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 6,
  },
  badge: {
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  retailerBadge: {
    backgroundColor: COLORS.retailerBadge,
  },
  wholesalerBadge: {
    backgroundColor: COLORS.wholesalerBadge,
  },
  activeBadge: {
    backgroundColor: COLORS.activeBadge,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  retailerText: {
    color: COLORS.retailerText,
  },
  wholesalerText: {
    color: COLORS.wholesalerText,
  },
  activeText: {
    color: COLORS.activeText,
  },

  // Buttons
  buttonsRow: {
    flexDirection: 'row',
    gap: 6,
  },
  btnView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 7,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: COLORS.btnViewBorder,
    backgroundColor: COLORS.btnViewBg,
    gap: 4,
  },
  btnViewText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.btnViewText,
    letterSpacing: 0.3,
  },
  btnCreate: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 7,
    borderRadius: 8,
    backgroundColor: COLORS.btnCreateBg,
    gap: 4,
  },
  btnCreateText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.btnCreateText,
    letterSpacing: 0.3,
  },

  // Empty state
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginTop: 12,
  },
  emptySubText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
});

export { CARD_WIDTH, CARD_MARGIN };