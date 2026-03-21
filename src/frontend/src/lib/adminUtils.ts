// Hardcoded admin principal — mirrors backend hardcoding for reliability
export const ADMIN_PRINCIPAL =
  "hzsfz-kiu7s-v7ls7-t7khq-ydmaz-ycmoh-tbz6k-vydx4-7nmxd-6qcse-jae";

export function isAdminPrincipal(
  principal: string | null | undefined,
): boolean {
  return !!principal && principal === ADMIN_PRINCIPAL;
}
