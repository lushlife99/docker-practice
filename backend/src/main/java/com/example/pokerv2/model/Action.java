package com.example.pokerv2.model;

import com.example.pokerv2.enums.PhaseStatus;
import com.example.pokerv2.enums.Position;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Action {

    @Id @GeneratedValue
    private Long id;
    private int actionNo;
    private Long userId;
    private int position;
    @Enumerated(EnumType.ORDINAL)
    private PhaseStatus phaseStatus;
    @Builder.Default
    private String detail="";
    @ManyToOne
    private HandHistory handHistory;
}