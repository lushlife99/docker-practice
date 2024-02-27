package com.example.pokerv2.error;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    /* 400 BAD_REQUEST : 잘못된 요청 */

    NOT_ENOUGH_MONEY(HttpStatus.BAD_REQUEST, "잔고가 부족합니다"),
    BAD_REQUEST(HttpStatus.BAD_REQUEST, "잘못된 요청입니다"),

    /* 401 UNAUTHORIZED : 인증되지 않은 사용자 */

    NOT_EXISTS_USER(HttpStatus.UNAUTHORIZED, "존재하지 않는 userId 입니다"),
    MISMATCH_PASSWORD(HttpStatus.UNAUTHORIZED, "비밀번호가 일치하지 않습니다"),
    UNAUTHORIZED_USER(HttpStatus.UNAUTHORIZED, "인증되지 않은 사용자입니다"),
    /* 403 FORBIDDEN : 권한이 없는 사용자 */


    /* 404 NOT_FOUND : Resource 를 찾을 수 없음 */
    FILE_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않은 경로입니다"),

    /* 409 CONFLICT : Resource 의 현재 상태와 충돌. 보통 중복된 데이터 존재 */
    DUPLICATE_USER(HttpStatus.CONFLICT, "이미 존재하는 userId 입니다"),
    MAX_PLAYER_SIZE(HttpStatus.CONFLICT, "플레이어 입장 수 초과입니다"),
    AlREADY_PLAYING_BOARD(HttpStatus.CONFLICT, "이미 플레이중인 보드입니다"),

    /* 500 INTERNAL_SERVER_ERROR : 서버오류 */
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "서버 오류")
    ;

    private final HttpStatus httpStatus;
    private final String detail;
}
